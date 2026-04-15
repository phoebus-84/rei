<script lang="ts">
	import { page } from '$app/state';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Navbar from '$lib/sections/Navbar.svelte';
	import Footer from '$lib/sections/Footer.svelte';
	import CookieConsent from '$lib/components/CookieConsent.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	{#if !page.url.pathname.startsWith('/admin')}
		<Navbar />
	{/if}
	{@render children()}
	{#if !page.url.pathname.startsWith('/admin')}
		<Footer />
		<CookieConsent />
	{/if}
</ParaglideJS>
