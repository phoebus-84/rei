<script lang="ts">
	type Props = {
		html: string;
		compact?: boolean;
		class?: string;
	};

	let { html, compact = false, class: className = '' }: Props = $props();
</script>

<div class={`seo-rich-text ${compact ? 'seo-rich-text--compact' : ''} ${className}`}>
	<!-- Content is trusted HTML authored in the authenticated SEO admin. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html html}
</div>
