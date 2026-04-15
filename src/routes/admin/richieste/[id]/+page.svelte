<script lang="ts">
	import { page } from '$app/state';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { ArrowLeft, Mail, Phone, Building2, Download, Trash2, ShieldCheck, ShieldX, UserX } from 'lucide-svelte';

	let inquiry = $state<any>(null);
	let loading = $state(true);
	let updating = $state(false);
	let error = $state('');
	let gdprMessage = $state('');

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

	function exportInquiryData() {
		if (!inquiry) return;
		const exportData = {
			exported_at: new Date().toISOString(),
			purpose: 'GDPR Data Subject Access Request (Art. 15/20)',
			data: {
				customer_name: inquiry.customer_name,
				customer_email: inquiry.customer_email,
				customer_phone: inquiry.customer_phone,
				message: inquiry.message,
				property_reference: inquiry.expand?.property?.title ?? inquiry.property,
				status: inquiry.status,
				created: inquiry.created,
				updated: inquiry.updated,
				privacy_accepted: inquiry.privacy_accepted ?? false,
				privacy_accepted_at: inquiry.privacy_accepted_at ?? null,
				privacy_policy_version: inquiry.privacy_policy_version ?? null
			}
		};
		const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `dsar_${inquiry.customer_email.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
		a.click();
		URL.revokeObjectURL(url);
		gdprMessage = 'Dati esportati con successo';
		setTimeout(() => gdprMessage = '', 3000);
	}

	async function exportAllByEmail() {
		if (!inquiry) return;
		try {
			const results = await pb.collection('inquiries').getFullList({
				filter: `customer_email = "${inquiry.customer_email}"`,
				expand: 'property'
			});
			const exportData = {
				exported_at: new Date().toISOString(),
				purpose: 'GDPR Data Subject Access Request (Art. 15/20) — All records',
				email: inquiry.customer_email,
				total_records: results.length,
				records: results.map((r: any) => ({
					customer_name: r.customer_name,
					customer_email: r.customer_email,
					customer_phone: r.customer_phone,
					message: r.message,
					property_reference: r.expand?.property?.title ?? r.property,
					status: r.status,
					created: r.created,
					updated: r.updated,
					privacy_accepted: r.privacy_accepted ?? false,
					privacy_accepted_at: r.privacy_accepted_at ?? null,
					privacy_policy_version: r.privacy_policy_version ?? null
				}))
			};
			const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `dsar_all_${inquiry.customer_email.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
			a.click();
			URL.revokeObjectURL(url);
			gdprMessage = 'Tutti i dati esportati con successo';
			setTimeout(() => gdprMessage = '', 3000);
		} catch (err) {
			console.error('Export error:', err);
			gdprMessage = 'Errore durante l\'esportazione';
		}
	}

	async function anonymizeInquiry() {
		if (!inquiry) return;
		if (!confirm('Sei sicuro di voler anonimizzare i dati personali di questa richiesta? Questa azione è irreversibile.')) return;
		try {
			inquiry = await pb.collection('inquiries').update(page.params.id!, {
				customer_name: '[ANONIMIZZATO]',
				customer_email: `anon_${inquiry.id}@removed.gdpr`,
				customer_phone: '',
				message: '[Contenuto rimosso per conformità GDPR]'
			});
			gdprMessage = 'Dati anonimizzati con successo';
			setTimeout(() => gdprMessage = '', 3000);
		} catch (err) {
			console.error('Anonymize error:', err);
			gdprMessage = 'Errore durante l\'anonimizzazione';
		}
	}

	async function deleteInquiry() {
		if (!inquiry) return;
		if (!confirm('Sei sicuro di voler eliminare definitivamente questa richiesta e tutti i dati associati? Questa azione è irreversibile.')) return;
		try {
			await pb.collection('inquiries').delete(page.params.id!);
			window.location.href = '/admin/richieste';
		} catch (err) {
			console.error('Delete error:', err);
			gdprMessage = 'Errore durante l\'eliminazione. Verifica i permessi admin.';
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

			<!-- GDPR Management Section -->
			<div class="rounded-lg border border-amber-200 bg-amber-50/50 p-6">
				<h2 class="mb-4 flex items-center gap-2 text-sm font-semibold text-amber-900">
					{#if inquiry.privacy_accepted}
						<ShieldCheck class="h-4 w-4" />
					{:else}
						<ShieldX class="h-4 w-4" />
					{/if}
					Gestione GDPR
				</h2>

				<!-- Consent Status -->
				<div class="mb-4 rounded-md border border-amber-200 bg-white p-3">
					<p class="text-sm text-muted-foreground">Stato Consenso Privacy:</p>
					{#if inquiry.privacy_accepted}
						<p class="mt-1 flex items-center gap-2 text-sm font-medium text-green-700">
							<ShieldCheck class="h-4 w-4" />
							Consenso prestato
							{#if inquiry.privacy_accepted_at}
								— {new Date(inquiry.privacy_accepted_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
							{/if}
							{#if inquiry.privacy_policy_version}
								<span class="text-xs text-muted-foreground">(v{inquiry.privacy_policy_version})</span>
							{/if}
						</p>
					{:else}
						<p class="mt-1 flex items-center gap-2 text-sm font-medium text-amber-700">
							<ShieldX class="h-4 w-4" />
							Consenso non registrato (richiesta precedente al GDPR)
						</p>
					{/if}
				</div>

				{#if gdprMessage}
					<div class="mb-4 rounded-md bg-green-100 border border-green-200 px-3 py-2 text-sm text-green-800">
						{gdprMessage}
					</div>
				{/if}

				<!-- GDPR Actions -->
				<div class="flex flex-wrap gap-2">
					<button
						onclick={exportInquiryData}
						class="inline-flex items-center gap-2 rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800 transition-colors hover:bg-blue-100"
					>
						<Download class="h-4 w-4" />
						Esporta Dati (DSAR)
					</button>
					<button
						onclick={exportAllByEmail}
						class="inline-flex items-center gap-2 rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800 transition-colors hover:bg-blue-100"
					>
						<Download class="h-4 w-4" />
						Esporta tutti per email
					</button>
					<button
						onclick={anonymizeInquiry}
						class="inline-flex items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-100"
					>
						<UserX class="h-4 w-4" />
						Anonimizza
					</button>
					<button
						onclick={deleteInquiry}
						class="inline-flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-800 transition-colors hover:bg-red-100"
					>
						<Trash2 class="h-4 w-4" />
						Elimina Richiesta
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
