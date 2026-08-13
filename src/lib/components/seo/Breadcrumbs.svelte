<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';

	type Item = { label: string; href?: string };
	let { items }: { items: Item[] } = $props();
</script>

<nav aria-label="Breadcrumb" class="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
	{#each items as item, index (item.label)}
		{#if index > 0}
			<ChevronRight class="h-3.5 w-3.5" aria-hidden="true" />
		{/if}
		{#if item.href}
			<a href={item.href} class="transition-colors hover:text-primary">{item.label}</a>
		{:else}
			<span class="font-medium text-foreground" aria-current="page">{item.label}</span>
		{/if}
	{/each}
</nav>
