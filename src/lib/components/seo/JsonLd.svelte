<script lang="ts">
	let { value }: { value: string } = $props();
	const element = 'script';
</script>

<svelte:element this={element} type="application/ld+json">{value}</svelte:element>
