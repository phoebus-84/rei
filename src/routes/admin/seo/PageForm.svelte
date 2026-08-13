<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	import type { SeoIntent } from '$lib/seo/types';
	import { getSeoIntentDefinition } from '$lib/seo/intents';
	import { seoIntentOptions } from '$lib/admin/seo';
	import { Eye, FileText } from 'lucide-svelte';

	type Values = {
		locationId: string;
		intent: SeoIntent;
		enabled: boolean;
		indexable: boolean;
		title: string;
		metaDescription: string;
		h1: string;
		intro: string;
		content: string;
	};

	type Props = {
		seoPage?: RecordModel | null;
		locations: RecordModel[];
		isLoading?: boolean;
		onsubmit: (values: Values) => void | Promise<void>;
	};

	let { seoPage = null, locations, isLoading = false, onsubmit }: Props = $props();
	// Form props are fixed for the lifetime of each create/edit route.
	// svelte-ignore state_referenced_locally
	let locationId = $state(seoPage?.location ?? '');
	// svelte-ignore state_referenced_locally
	let intent = $state<SeoIntent>((seoPage?.intent as SeoIntent) ?? 'case-in-vendita');
	// svelte-ignore state_referenced_locally
	let enabled = $state(seoPage?.enabled ?? true);
	// svelte-ignore state_referenced_locally
	let indexable = $state(seoPage?.indexable ?? true);
	// svelte-ignore state_referenced_locally
	let title = $state(seoPage?.title ?? '');
	// svelte-ignore state_referenced_locally
	let metaDescription = $state(seoPage?.meta_description ?? '');
	// svelte-ignore state_referenced_locally
	let h1 = $state(seoPage?.h1 ?? '');
	// svelte-ignore state_referenced_locally
	let intro = $state(seoPage?.intro ?? '');
	// svelte-ignore state_referenced_locally
	let content = $state(seoPage?.content ?? '');

	const inputClass =
		'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';
	const selectedLocation = $derived(locations.find((location) => location.id === locationId));
	const template = $derived(getSeoIntentDefinition(intent));
	const previewName = $derived(selectedLocation?.name || 'Nome comune');
	const canonicalPath = $derived(
		selectedLocation ? `/${intent}/${selectedLocation.slug}` : `/${intent}/slug-comune`
	);

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		onsubmit({
			locationId,
			intent,
			enabled,
			indexable,
			title,
			metaDescription,
			h1,
			intro,
			content
		});
	}
</script>

<form class="space-y-8" onsubmit={handleSubmit}>
	<section class="rounded-lg border bg-background p-6">
		<div class="flex items-start gap-3">
			<FileText class="mt-0.5 h-5 w-5 text-primary" />
			<div>
				<h2 class="font-semibold">Pagina e pubblicazione</h2>
				<p class="mt-1 text-sm text-muted-foreground">Ogni combinazione comune/intento può esistere una sola volta.</p>
			</div>
		</div>

		<div class="mt-6 grid gap-5 sm:grid-cols-2">
			<label class="space-y-2">
				<span class="text-sm font-medium">Comune *</span>
				<select bind:value={locationId} required disabled={Boolean(seoPage)} class={inputClass}>
					<option value="">Seleziona un comune</option>
					{#each locations as location (location.id)}
						<option value={location.id}>{location.name}</option>
					{/each}
				</select>
			</label>
			<label class="space-y-2">
				<span class="text-sm font-medium">Intento *</span>
				<select bind:value={intent} disabled={Boolean(seoPage)} class={inputClass}>
					{#each seoIntentOptions as option (option.value)}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</label>
		</div>

		<div class="mt-6 grid gap-3 sm:grid-cols-2">
			<label class="flex cursor-pointer items-start gap-3 rounded-md border p-4">
				<input bind:checked={enabled} type="checkbox" class="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-primary" />
				<span><strong class="block text-sm">Pagina abilitata</strong><small class="mt-1 block leading-5 text-muted-foreground">Se disattivata, URL, hub e collegamenti restituiscono/non espongono la pagina.</small></span>
			</label>
			<label class="flex cursor-pointer items-start gap-3 rounded-md border p-4">
				<input bind:checked={indexable} type="checkbox" class="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-primary" />
				<span><strong class="block text-sm">Indicizzabile</strong><small class="mt-1 block leading-5 text-muted-foreground">Controlla robots e sitemap, anche quando l’inventario è temporaneamente vuoto.</small></span>
			</label>
		</div>
	</section>

	<section class="rounded-lg border bg-background p-6">
		<h2 class="font-semibold">SEO e contenuto</h2>
		<p class="mt-1 text-sm text-muted-foreground">Lascia vuoto un campo per usare il testo deterministico mostrato come suggerimento.</p>

		<div class="mt-6 space-y-5">
			<label class="block space-y-2">
				<span class="text-sm font-medium">Title</span>
				<input bind:value={title} maxlength="70" class={inputClass} placeholder={template.locationTitle(previewName)} />
				<small class="text-muted-foreground">{title.length}/70</small>
			</label>
			<label class="block space-y-2">
				<span class="text-sm font-medium">Meta description</span>
				<textarea bind:value={metaDescription} maxlength="180" rows="3" class={inputClass} placeholder={template.locationDescription(previewName)}></textarea>
				<small class="text-muted-foreground">{metaDescription.length}/180</small>
			</label>
			<label class="block space-y-2">
				<span class="text-sm font-medium">H1</span>
				<input bind:value={h1} class={inputClass} placeholder={template.locationHeading(previewName)} />
			</label>
			<label class="block space-y-2">
				<span class="text-sm font-medium">Introduzione</span>
				<textarea bind:value={intro} rows="4" class={inputClass} placeholder={template.locationIntro(previewName)}></textarea>
			</label>
			<label class="block space-y-2">
				<span class="text-sm font-medium">Contenuto editoriale HTML</span>
				<textarea bind:value={content} rows="12" class={`${inputClass} font-mono`} placeholder="<h2>Approfondimento locale</h2>\n<p>Contenuto verificato…</p>"></textarea>
				<small class="leading-5 text-muted-foreground">HTML fidato inserito dagli amministratori. Non aggiungere script, iframe o fatti locali non verificati.</small>
			</label>
		</div>
	</section>

	<section class="rounded-lg border border-primary/20 bg-primary/5 p-5">
		<div class="flex items-start gap-3">
			<Eye class="mt-0.5 h-5 w-5 text-primary" />
			<div class="min-w-0">
				<p class="text-xs font-semibold uppercase tracking-wider text-primary">Anteprima tecnica</p>
				<p class="mt-2 break-all text-sm font-semibold">{canonicalPath}</p>
				<p class="mt-2 text-sm">{title || template.locationTitle(previewName)}</p>
				<p class="mt-1 text-xs text-muted-foreground">{enabled ? 'Abilitata' : 'Disabilitata'} · {indexable ? 'index,follow' : 'noindex,follow'}</p>
			</div>
		</div>
	</section>

	<div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
		<a href="/admin/seo/pagine" class="rounded-md border px-5 py-2.5 text-center text-sm font-medium hover:bg-muted">Annulla</a>
		<button type="submit" disabled={isLoading} class="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
			{isLoading ? 'Salvataggio…' : seoPage ? 'Aggiorna pagina' : 'Crea pagina'}
		</button>
	</div>
</form>
