<script lang="ts">
	import type { LocationSuggestion } from '$lib/location';
	import { MapPin, Search, X } from 'lucide-svelte';

	type Props = {
		value?: string;
		inputId?: string;
		label?: string;
		placeholder?: string;
		selectedLabel?: string;
		required?: boolean;
		disabled?: boolean;
		onSelect?: (suggestion: LocationSuggestion) => void;
		onClear?: () => void;
	};

	let {
		value = $bindable(''),
		inputId = 'location-lookup',
		label = 'Posizione',
		placeholder = 'Cerca indirizzo o comune...',
		selectedLabel = '',
		required = false,
		disabled = false,
		onSelect = () => {},
		onClear = () => {}
	}: Props = $props();

	let suggestions = $state<LocationSuggestion[]>([]);
	let isLoading = $state(false);
	let error = $state('');
	let isOpen = $state(false);
	let lastSelectedValue = $state('');
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;
	let activeRequest = 0;

	const inputClass =
		'mt-1 h-10 w-full rounded-md border border-input bg-background pl-9 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60';

	$effect(() => {
		const query = value.trim();
		activeRequest += 1;
		const requestId = activeRequest;

		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		if (query.length < 3 || disabled || query === lastSelectedValue) {
			suggestions = [];
			isLoading = false;
			error = '';
			isOpen = false;
			return;
		}

		isLoading = true;
		error = '';

		debounceTimer = setTimeout(async () => {
			try {
				const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}&limit=5`);
				const payload = (await response.json()) as {
					suggestions?: LocationSuggestion[];
					error?: string;
				};

				if (requestId !== activeRequest) return;

				if (!response.ok) {
					throw new Error(payload.error || 'Lookup posizione non disponibile');
				}

				suggestions = payload.suggestions || [];
				isOpen = true;
			} catch (err) {
				if (requestId !== activeRequest) return;
				suggestions = [];
				error = err instanceof Error ? err.message : 'Lookup posizione non disponibile';
			} finally {
				if (requestId === activeRequest) {
					isLoading = false;
				}
			}
		}, 450);

		return () => {
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}
		};
	});

	function selectSuggestion(suggestion: LocationSuggestion) {
		lastSelectedValue = suggestion.label;
		value = suggestion.label;
		suggestions = [];
		isLoading = false;
		isOpen = false;
		error = '';
		onSelect(suggestion);
	}

	function clearSelection() {
		lastSelectedValue = '';
		value = '';
		suggestions = [];
		isLoading = false;
		isOpen = false;
		error = '';
		onClear();
	}
</script>

<div class="relative">
	<label for={inputId} class="block text-sm font-medium text-foreground">
		{label}{required ? ' *' : ''}
	</label>
	<div class="relative">
		<Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
		<input
			id={inputId}
			type="text"
			bind:value
			{placeholder}
			{required}
			{disabled}
			autocomplete="off"
			class={inputClass}
			onfocus={() => (isOpen = suggestions.length > 0)}
		/>
		{#if value}
			<button
				type="button"
				onclick={clearSelection}
				class="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
				aria-label="Cancella posizione"
			>
				<X class="h-4 w-4" />
			</button>
		{/if}
	</div>

	{#if selectedLabel}
		<div class="mt-2 flex items-start gap-2 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
			<MapPin class="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
			<span>{selectedLabel}</span>
		</div>
	{/if}

	{#if isLoading}
		<p class="mt-2 text-xs text-muted-foreground">Ricerca posizione...</p>
	{:else if error}
		<p class="mt-2 text-xs text-destructive">{error}</p>
	{:else if value.trim().length >= 3 && isOpen && suggestions.length === 0}
		<p class="mt-2 text-xs text-muted-foreground">Nessuna posizione trovata.</p>
	{/if}

	{#if isOpen && suggestions.length > 0}
		<div class="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-md border border-border bg-popover shadow-lg">
			{#each suggestions as suggestion (`${suggestion.osmType}-${suggestion.osmId}-${suggestion.latitude}-${suggestion.longitude}`)}
				<button
					type="button"
					onclick={() => selectSuggestion(suggestion)}
					class="flex w-full items-start gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-muted focus:bg-muted focus:outline-none"
				>
					<MapPin class="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
					<span class="line-clamp-2 text-foreground">{suggestion.label}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
