<script lang="ts">
	import { page } from '$app/state';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { ArrowLeft, Mail, Phone, Building2 } from 'lucide-svelte';

	let inquiry = $state<any>(null);
	let loading = $state(true);
	let updating = $state(false);
	let error = $state('');

	const statusLabels: Record<string, string> = {
		new: 'Nuova',
		read: 'Letta',
		responded: 'Risposta'
	};
	const statusColors: Record<string, string> = {
		new: 'bg-amber-100 text-amber-800',
		read: 'bg-blue-100 text-blue-800',
		responded: 'bg-green-100 text-green-800'
	};

	onMount(async () => {
		try {
			inquiry = await pb.collection('inquiries').getOne(page.params.id!, {
				expand: 'property'
			});
			// Auto-mark as read if new
			if (inquiry.status === 'new') {
				await updateStatus('read');
			}
		} catch (err: any) {
			error = 'Richiesta non trovata.';
		} finally {
			loading = false;
		}
	});

	async function updateStatus(newStatus: string) {
		updating = true;
		try {
			inquiry = await pb.collection('inquiries').update(page.params.id!, {
				status: newStatus
			});
		} catch (err: any) {
			console.error('Update status error:', err);
		} finally {
			updating = false;
		}
	}
</script>

<svelte:head>
	<title>Richiesta di {inquiry?.customer_name ?? '...'} | REI Admin</title>
</svelte:head>

<div>
	<a
		href="/admin/richieste"
		class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
	>
		<ArrowLeft class="h-4 w-4" />
		Torna alle richieste
	</a>

	{#if loading}
		<div class="mt-8 flex justify-center">
			<div
				class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
			></div>
		</div>
	{:else if error}
		<div class="mt-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
			{error}
		</div>
	{:else if inquiry}
		<div class="mt-6 max-w-3xl space-y-6">
			<!-- Header -->
			<div class="flex items-start justify-between">
				<div>
					<h1 class="text-2xl font-bold text-foreground">{inquiry.customer_name}</h1>
					<p class="mt-1 text-sm text-muted-foreground">
						Ricevuta il {new Date(inquiry.created).toLocaleDateString('it-IT', {
							day: 'numeric',
							month: 'long',
							year: 'numeric'
						})}
					</p>
				</div>
				<span
					class="inline-flex rounded-full px-3 py-1 text-sm font-medium {statusColors[
						inquiry.status
					] ?? ''}"
				>
					{statusLabels[inquiry.status] ?? inquiry.status}
				</span>
			</div>

			<!-- Contact info -->
			<div class="grid gap-4 sm:grid-cols-2">
				<div class="flex items-center gap-3 rounded-lg border bg-background p-4">
					<Mail class="h-5 w-5 text-muted-foreground" />
					<div>
						<p class="text-xs text-muted-foreground">Email</p>
						<a
							href="mailto:{inquiry.customer_email}"
							class="text-sm font-medium text-primary hover:underline"
						>
							{inquiry.customer_email}
						</a>
					</div>
				</div>
				{#if inquiry.customer_phone}
					<div class="flex items-center gap-3 rounded-lg border bg-background p-4">
						<Phone class="h-5 w-5 text-muted-foreground" />
						<div>
							<p class="text-xs text-muted-foreground">Telefono</p>
							<a
								href="tel:{inquiry.customer_phone}"
								class="text-sm font-medium text-primary hover:underline"
							>
								{inquiry.customer_phone}
							</a>
						</div>
					</div>
				{/if}
			</div>

			<!-- Property ref -->
			{#if inquiry.expand?.property}
				<div class="flex items-center gap-3 rounded-lg border bg-background p-4">
					<Building2 class="h-5 w-5 text-muted-foreground" />
					<div>
						<p class="text-xs text-muted-foreground">Immobile</p>
						<a
							href="/admin/immobili/{inquiry.expand.property.id}"
							class="text-sm font-medium text-primary hover:underline"
						>
							{inquiry.expand.property.title}
						</a>
					</div>
				</div>
			{/if}

			<!-- Message -->
			<div class="rounded-lg border bg-background p-6">
				<h2 class="mb-3 text-sm font-semibold text-muted-foreground">Messaggio</h2>
				<p class="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
					{inquiry.message || 'Nessun messaggio.'}
				</p>
			</div>

			<!-- Status actions -->
			<div class="rounded-lg border bg-background p-6">
				<h2 class="mb-3 text-sm font-semibold text-muted-foreground">Aggiorna stato</h2>
				<div class="flex flex-wrap gap-2">
					<button
						onclick={() => updateStatus('new')}
						disabled={updating || inquiry.status === 'new'}
						class="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-amber-50 disabled:opacity-50 {inquiry.status ===
						'new'
							? 'border-amber-300 bg-amber-50 text-amber-800'
							: ''}"
					>
						Nuova
					</button>
					<button
						onclick={() => updateStatus('read')}
						disabled={updating || inquiry.status === 'read'}
						class="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-50 disabled:opacity-50 {inquiry.status ===
						'read'
							? 'border-blue-300 bg-blue-50 text-blue-800'
							: ''}"
					>
						Letta
					</button>
					<button
						onclick={() => updateStatus('responded')}
						disabled={updating || inquiry.status === 'responded'}
						class="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-green-50 disabled:opacity-50 {inquiry.status ===
						'responded'
							? 'border-green-300 bg-green-50 text-green-800'
							: ''}"
					>
						Risposta inviata
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
