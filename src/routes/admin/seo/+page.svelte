<script lang="ts">
	import { ArrowRight, FileText, MapPinned } from 'lucide-svelte';
</script>

<svelte:head>
	<title>SEO locale | REI Admin</title>
</svelte:head>

<div>
	<div class="max-w-3xl">
		<p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Programmatic SEO</p>
		<h1 class="mt-2 text-2xl font-bold text-foreground">SEO locale</h1>
		<p class="mt-2 leading-7 text-muted-foreground">
			Gestisci prima i comuni canonici e le loro relazioni geografiche, poi abilita le pagine per
			vendita, affitto e valutazione.
		</p>
	</div>

	<div class="mt-8 grid max-w-5xl gap-5 md:grid-cols-2">
		<a href="/admin/seo/comuni" class="group rounded-lg border bg-background p-6 transition-colors hover:border-primary/40">
			<div class="flex items-start justify-between gap-4">
				<div class="rounded-md bg-primary/10 p-3"><MapPinned class="h-6 w-6 text-primary" /></div>
				<ArrowRight class="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
			</div>
			<h2 class="mt-6 text-lg font-semibold">Comuni SEO</h2>
			<p class="mt-2 text-sm leading-6 text-muted-foreground">Slug canonici, nomi accentati, coordinate e comuni vicini tramite relazioni validate.</p>
		</a>

		<a href="/admin/seo/pagine" class="group rounded-lg border bg-background p-6 transition-colors hover:border-primary/40">
			<div class="flex items-start justify-between gap-4">
				<div class="rounded-md bg-brand-terracotta/10 p-3"><FileText class="h-6 w-6 text-brand-terracotta" /></div>
				<ArrowRight class="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
			</div>
			<h2 class="mt-6 text-lg font-semibold">Pagine locali</h2>
			<p class="mt-2 text-sm leading-6 text-muted-foreground">Intenti attivi, indicizzabilità, metadata e contenuto editoriale con fallback automatici.</p>
		</a>
	</div>
</div>
