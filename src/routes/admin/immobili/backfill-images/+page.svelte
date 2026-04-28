<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import {
		buildPropertyImageMetadata,
		optimizePropertyImages,
		type ImageSeoFields,
		type OptimizedPropertyImage
	} from '$lib/utils';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	import {
		CheckCircle2,
		Image as ImageIcon,
		Loader2,
		Play,
		RefreshCw,
		XCircle
	} from 'lucide-svelte';

	type BackfillProperty = RecordModel & {
		title?: string;
		city?: string;
		images?: string[];
		images_thumb_webp?: string[];
		images_card_webp?: string[];
		images_hero_webp?: string[];
		cover_image?: string;
		image_alt?: string;
		image_title?: string;
		image_caption?: string;
		image_metadata?: unknown;
	};

	type BackfillLog = {
		id: string;
		title: string;
		status: 'success' | 'skipped' | 'error';
		message: string;
	};

	let properties = $state<BackfillProperty[]>([]);
	let logs = $state<BackfillLog[]>([]);
	let loading = $state(true);
	let running = $state(false);
	let currentTitle = $state('');
	let error = $state('');
	let processed = $state(0);

	const MAX_DOWNLOAD_ATTEMPTS = 5;
	const DOWNLOAD_RETRY_BASE_DELAY_MS = 1500;
	const DOWNLOAD_THROTTLE_MS = 750;
	const PROPERTY_THROTTLE_MS = 1000;
	const RETRYABLE_DOWNLOAD_STATUSES = new Set([408, 429, 500, 502, 503, 504]);

	const eligibleProperties = $derived(properties.filter((property) => needsBackfill(property)));
	const completedCount = $derived(properties.length - eligibleProperties.length);

	function wait(milliseconds: number) {
		return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
	}

	function asStringArray(value: unknown): string[] {
		return Array.isArray(value)
			? value.filter((item): item is string => typeof item === 'string')
			: [];
	}

	function needsBackfill(property: BackfillProperty): boolean {
		const images = asStringArray(property.images);
		if (images.length === 0) return false;

		return (
			asStringArray(property.images_thumb_webp).length < images.length ||
			asStringArray(property.images_card_webp).length < images.length ||
			asStringArray(property.images_hero_webp).length < images.length
		);
	}

	function getImageSeo(property: BackfillProperty): ImageSeoFields {
		const title = property.title || 'Immobile REI';
		const fallbackAlt = [title, property.city].filter(Boolean).join(' - ');

		return {
			alt: property.image_alt?.trim() || fallbackAlt,
			title: property.image_title?.trim() || title,
			caption: property.image_caption?.trim() || ''
		};
	}

	function guessImageType(filename: string): string {
		const extension = filename.split('.').pop()?.toLowerCase();
		if (extension === 'png') return 'image/png';
		if (extension === 'webp') return 'image/webp';
		return 'image/jpeg';
	}

	function getRetryDelay(response: Response, attempt: number): number {
		const retryAfter = response.headers.get('retry-after');
		if (retryAfter) {
			const retrySeconds = Number(retryAfter);
			if (Number.isFinite(retrySeconds)) {
				return Math.max(1000, retrySeconds * 1000);
			}

			const retryDate = Date.parse(retryAfter);
			if (Number.isFinite(retryDate)) {
				return Math.max(1000, retryDate - Date.now());
			}
		}

		return Math.min(DOWNLOAD_RETRY_BASE_DELAY_MS * 2 ** (attempt - 1), 12000);
	}

	async function fetchOriginalFile(property: BackfillProperty, filename: string): Promise<File> {
		let lastStatus = 0;

		for (let attempt = 1; attempt <= MAX_DOWNLOAD_ATTEMPTS; attempt += 1) {
			const response = await fetch(pb.files.getUrl(property, filename));
			lastStatus = response.status;

			if (response.ok) {
				const blob = await response.blob();
				const type = blob.type.startsWith('image/') ? blob.type : guessImageType(filename);
				return new File([blob], filename, { type, lastModified: Date.now() });
			}

			if (!RETRYABLE_DOWNLOAD_STATUSES.has(response.status) || attempt === MAX_DOWNLOAD_ATTEMPTS) {
				break;
			}

			await wait(getRetryDelay(response, attempt));
		}

		throw new Error(
			`Download fallito per ${filename} (${lastStatus}) dopo ${MAX_DOWNLOAD_ATTEMPTS} tentativi.`
		);
	}

	async function loadProperties() {
		loading = true;
		error = '';
		try {
			properties = (await pb.collection('properties').getFullList({
				sort: 'title'
			})) as BackfillProperty[];
		} catch (err: unknown) {
			error = err instanceof Error ? err.message : 'Impossibile caricare gli immobili.';
		} finally {
			loading = false;
		}
	}

	function appendLog(log: BackfillLog) {
		logs = [log, ...logs];
	}

	function releasePreviews(images: OptimizedPropertyImage[]) {
		for (const image of images) {
			URL.revokeObjectURL(image.previewUrl);
		}
	}

	async function backfillProperty(property: BackfillProperty) {
		const imageNames = asStringArray(property.images);
		const files: File[] = [];

		for (const [index, filename] of imageNames.entries()) {
			files.push(await fetchOriginalFile(property, filename));
			if (index < imageNames.length - 1) {
				await wait(DOWNLOAD_THROTTLE_MS);
			}
		}

		const optimizedImages = await optimizePropertyImages(files);
		const formData = new FormData();

		try {
			for (const image of optimizedImages) {
				formData.append('images_thumb_webp', image.thumbFile);
				formData.append('images_card_webp', image.cardFile);
				formData.append('images_hero_webp', image.heroFile);
			}

			const updated = (await pb
				.collection('properties')
				.update(property.id, formData)) as BackfillProperty;
			const imageMetadata = buildPropertyImageMetadata({
				record: updated,
				existingMetadata: [],
				removedSourceFileNames: [],
				existingImageCountAfterRemoval: 0,
				optimizedImages,
				seo: getImageSeo(property)
			});

			await pb.collection('properties').update(property.id, {
				cover_image: property.cover_image || imageNames[0] || '',
				image_metadata: imageMetadata
			});
		} finally {
			releasePreviews(optimizedImages);
		}
	}

	async function runBackfill() {
		if (running || eligibleProperties.length === 0) return;

		running = true;
		processed = 0;
		logs = [];
		error = '';

		const queue = [...eligibleProperties];

		for (const [index, property] of queue.entries()) {
			currentTitle = property.title || property.id;
			try {
				await backfillProperty(property);
				appendLog({
					id: property.id,
					title: currentTitle,
					status: 'success',
					message: `${asStringArray(property.images).length} immagini ottimizzate.`
				});
			} catch (err: unknown) {
				appendLog({
					id: property.id,
					title: currentTitle,
					status: 'error',
					message: err instanceof Error ? err.message : 'Errore durante il backfill.'
				});
			} finally {
				processed += 1;
			}

			if (index < queue.length - 1) {
				await wait(PROPERTY_THROTTLE_MS);
			}
		}

		currentTitle = '';
		running = false;
		await loadProperties();
	}

	onMount(loadProperties);
</script>

<svelte:head>
	<title>Backfill immagini | REI Admin</title>
</svelte:head>

<div class="max-w-5xl">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
		<div>
			<a href="/admin/immobili" class="text-sm font-medium text-primary hover:underline">Immobili</a>
			<h1 class="mt-2 text-2xl font-bold text-foreground">Backfill immagini</h1>
			<p class="mt-1 max-w-2xl text-sm text-muted-foreground">
				Genera thumb, card e hero WebP per gli immobili che hanno solo immagini originali,
				scaricandole una alla volta per rispettare i limiti del backend.
			</p>
		</div>

		<div class="flex gap-2">
			<button
				type="button"
				onclick={loadProperties}
				disabled={loading || running}
				class="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
			>
				<RefreshCw class={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
				Aggiorna
			</button>
			<button
				type="button"
				onclick={runBackfill}
				disabled={loading || running || eligibleProperties.length === 0}
				class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
			>
				{#if running}
					<Loader2 class="h-4 w-4 animate-spin" />
				{:else}
					<Play class="h-4 w-4" />
				{/if}
				Avvia
			</button>
		</div>
	</div>

	{#if error}
		<div class="mt-6 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
			{error}
		</div>
	{/if}

	<div class="mt-6 grid gap-3 sm:grid-cols-3">
		<div class="rounded-lg border bg-background p-4">
			<p class="text-sm text-muted-foreground">Totale</p>
			<p class="mt-1 text-2xl font-semibold text-foreground">{properties.length}</p>
		</div>
		<div class="rounded-lg border bg-background p-4">
			<p class="text-sm text-muted-foreground">Da ottimizzare</p>
			<p class="mt-1 text-2xl font-semibold text-foreground">{eligibleProperties.length}</p>
		</div>
		<div class="rounded-lg border bg-background p-4">
			<p class="text-sm text-muted-foreground">Completi</p>
			<p class="mt-1 text-2xl font-semibold text-foreground">{completedCount}</p>
		</div>
	</div>

	{#if running}
		<div class="mt-6 rounded-lg border bg-background p-4">
			<div class="flex items-center justify-between gap-4">
				<div>
					<p class="text-sm font-medium text-foreground">{currentTitle}</p>
					<p class="mt-1 text-sm text-muted-foreground">
						{processed} di {eligibleProperties.length} elaborati
					</p>
				</div>
				<Loader2 class="h-5 w-5 animate-spin text-primary" />
			</div>
			<div class="mt-4 h-2 overflow-hidden rounded-full bg-muted">
				<div
					class="h-full bg-primary transition-all"
					style={`width: ${eligibleProperties.length ? (processed / eligibleProperties.length) * 100 : 0}%`}
				></div>
			</div>
		</div>
	{/if}

	<div class="mt-6 rounded-lg border bg-background">
		<div class="border-b px-4 py-3">
			<h2 class="text-sm font-semibold text-foreground">Risultati</h2>
		</div>
		{#if loading}
			<div class="flex items-center gap-3 px-4 py-8 text-sm text-muted-foreground">
				<Loader2 class="h-4 w-4 animate-spin" />
				Caricamento immobili
			</div>
		{:else if logs.length === 0}
			<div class="flex items-center gap-3 px-4 py-8 text-sm text-muted-foreground">
				<ImageIcon class="h-4 w-4" />
				{eligibleProperties.length === 0
					? 'Tutte le immagini risultano gia ottimizzate.'
					: 'Nessun backfill eseguito in questa sessione.'}
			</div>
		{:else}
			<ul class="divide-y">
				{#each logs as log (log.id)}
					<li class="flex gap-3 px-4 py-3 text-sm">
						{#if log.status === 'success'}
							<CheckCircle2 class="mt-0.5 h-4 w-4 text-green-700" />
						{:else if log.status === 'error'}
							<XCircle class="mt-0.5 h-4 w-4 text-destructive" />
						{:else}
							<ImageIcon class="mt-0.5 h-4 w-4 text-muted-foreground" />
						{/if}
						<div>
							<p class="font-medium text-foreground">{log.title}</p>
							<p class="mt-0.5 text-muted-foreground">{log.message}</p>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>