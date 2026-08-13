<script lang="ts">
	import {
		Sheet,
		SheetContent,
		SheetHeader,
		SheetTitle,
		SheetTrigger
	} from '$lib/components/ui/sheet';
	import { buttonVariants } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { ChevronDown, MapPin, Menu, Phone, Mail } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase';
	import logo from '../assets/logo.png';

	interface RouteProps {
		href: string;
		label: string;
		secondary?: boolean;
	}

	const routeList: RouteProps[] = [
		{ href: '/#about', label: 'Chi Siamo' },
		{ href: '/case-in-vendita', label: 'Case in vendita' },
		{ href: '/case-in-affitto', label: 'Affitti' },
		{ href: '/valutazione', label: 'Valutazione casa' },
		{ href: '/immobili', label: 'Tutti gli immobili', secondary: true },
		{ href: '/#faq', label: 'Domande Frequenti' }
	];

	type LocalValuationPage = { id: string; location: { slug: string; name: string } };

	let isOpen = false;
	let localValuationPages: LocalValuationPage[] = [];

	onMount(async () => {
		try {
			const records = await pb.collection('seo_pages').getFullList({
				filter: 'enabled = true && intent = "valutazione-casa"',
				sort: 'location.name',
				expand: 'location'
			});
			localValuationPages = records.flatMap((record) => {
				const location = record.expand?.location;
				return location ? [{ id: record.id, location: { slug: location.slug, name: location.name } }] : [];
			});
		} catch (error) {
			console.error('Errore nel caricamento delle valutazioni locali:', error);
		}
	});

	function isActive(href: string, pathname: string): boolean {
		if (href.startsWith('/#')) return pathname === '/';
		return pathname.startsWith(href);
	}
</script>

<header
	class="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-b-slate-700 dark:bg-background/95"
>
	<div class="container flex h-16 items-center justify-between px-4">
		<!-- Logo -->
		<div class="flex items-center">
			<a href="/" class="flex items-center space-x-2">
				<img src={logo} alt="REI Logo" class="h-10 w-auto" />
			</a>
		</div>

		<!-- Desktop Navigation -->
		<nav class="hidden items-center gap-1 md:flex" aria-label="Navigazione principale">
			{#each routeList as { href, label, secondary }}
				{#if href === '/valutazione'}
					<div class="group relative">
						<a
							{href}
							class="inline-flex h-10 items-center justify-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary {isActive(href, $page.url.pathname) ? 'text-primary' : ''}"
							aria-current={isActive(href, $page.url.pathname) ? 'page' : undefined}
						>
							{label}<ChevronDown class="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
						</a>
						<div class="invisible absolute left-0 top-full z-50 w-72 translate-y-1 border border-border bg-card p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
							<div class="border-b border-border px-3 py-2">
								<p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Valutazioni locali</p>
								<p class="mt-1 text-xs leading-4 text-muted-foreground">Scegli un comune o avvia una stima generale.</p>
							</div>
							{#if localValuationPages.length > 0}
								<div class="mt-1 max-h-64 overflow-y-auto py-1">
									{#each localValuationPages as localPage (localPage.id)}
										<a href={`/valutazione-casa/${localPage.location.slug}`} class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary">
											<MapPin class="h-3.5 w-3.5 shrink-0 text-brand-terracotta" />
											Valuta casa a {localPage.location.name}
										</a>
									{/each}
								</div>
							{:else}
								<p class="px-3 py-4 text-xs leading-5 text-muted-foreground">Le valutazioni locali saranno disponibili a breve.</p>
							{/if}
							<a href="/valutazione" class="mt-1 flex items-center gap-2 border-t border-border px-3 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5">
								<Mail class="h-3.5 w-3.5" /> Avvia valutazione generale
							</a>
						</div>
					</div>
				{:else}
					<a
						{href}
						class="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm transition-colors hover:bg-muted hover:text-primary {secondary ? 'font-normal text-muted-foreground' : 'font-medium'} {isActive(href, $page.url.pathname) ? 'text-primary' : ''}"
						aria-current={isActive(href, $page.url.pathname) ? 'page' : undefined}
					>
						{label}
					</a>
				{/if}
			{/each}
		</nav>

		<div class="hidden items-center gap-2 md:flex">
			<a href="/valutazione" class={buttonVariants({ variant: 'default' })}>
				<Mail class="mr-2 h-4 w-4" />
				Richiedi Valutazione
			</a>
		</div>

		<!-- Mobile Menu -->
		<div class="flex md:hidden">
			<Sheet bind:open={isOpen}>
				<SheetTrigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
					<Menu class="h-5 w-5">
						<span class="sr-only">Menu</span>
					</Menu>
				</SheetTrigger>

				<SheetContent side="right" class="w-[300px] sm:w-[400px]">
					<SheetHeader>
						<SheetTitle class="flex items-center gap-2 text-left">
							<img src={logo} alt="REI Logo" class="h-8 w-auto" />
							<span class="text-xl font-bold">
								<span class="text-accent">REI</span>
							</span>
						</SheetTitle>
					</SheetHeader>
					<nav class="mt-8 flex flex-col gap-4" aria-label="Menu mobile">
						{#each routeList as { href, label, secondary }}
							<a
								{href}
								on:click={() => (isOpen = false)}
								class="transition-colors hover:text-primary {secondary ? 'ml-4 border-l border-border pl-4 text-sm font-medium text-muted-foreground' : 'text-lg font-medium'} {isActive(href, $page.url.pathname) ? 'text-primary' : ''}"
							>
								{label}
							</a>
							{#if href === '/valutazione' && localValuationPages.length > 0}
								<div class="ml-4 space-y-1 border-l border-border py-1 pl-4">
									<p class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Comuni</p>
									{#each localValuationPages as localPage (localPage.id)}
										<a href={`/valutazione-casa/${localPage.location.slug}`} on:click={() => (isOpen = false)} class="flex items-center gap-2 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary"><MapPin class="h-3.5 w-3.5" /> {localPage.location.name}</a>
									{/each}
								</div>
							{/if}
						{/each}
						<div class="mt-4 space-y-3 border-t pt-4">
							<a href="/valutazione" class="{buttonVariants({ variant: 'default' })} w-full">
								<Mail class="mr-2 h-4 w-4" />
								Richiedi Valutazione
							</a>
							<a href="tel:+390125282335" class="{buttonVariants({ variant: 'outline' })} w-full">
								<Phone class="mr-2 h-4 w-4" />
								Contattaci
							</a>
						</div>
					</nav>
				</SheetContent>
			</Sheet>
		</div>
	</div>
</header>
