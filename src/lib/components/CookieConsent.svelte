<script lang="ts">
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';

	let visible = $state(false);

	onMount(() => {
		const consent = localStorage.getItem('cookie_consent');
		if (!consent) {
			visible = true;
		}
	});

	function accept() {
		localStorage.setItem('cookie_consent', 'accepted');
		localStorage.setItem('cookie_consent_date', new Date().toISOString());
		visible = false;
	}

	export function show() {
		visible = true;
	}
</script>

{#if visible}
	<div
		class="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-4 shadow-lg sm:p-6"
		role="dialog"
		aria-label={m.cookie_banner_title()}
	>
		<div class="container mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="flex-1">
				<h3 class="text-sm font-semibold text-foreground">{m.cookie_banner_title()}</h3>
				<p class="mt-1 text-sm leading-relaxed text-muted-foreground">
					{m.cookie_banner_description()}
				</p>
			</div>
			<div class="flex items-center gap-3 shrink-0">
				<a
					href="/pp"
					class="text-sm text-primary underline-offset-2 hover:underline"
				>
					{m.cookie_more_info()}
				</a>
				<button
					onclick={accept}
					class="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
				>
					{m.cookie_accept()}
				</button>
			</div>
		</div>
	</div>
{/if}
