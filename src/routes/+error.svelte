<script lang="ts">
	import { page } from '$app/state';
	import image404 from '$lib/assets/404.png';
</script>

<div class="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
	<img
		src={image404}
		alt="Pagina non trovata"
		class="mb-8 w-full max-w-md"
	/>

	<h1 class="font-display text-fluid-section font-bold text-foreground">
		{page.status}
	</h1>

	<p class="mt-4 max-w-md text-lg text-muted-foreground">
		{#if page.status === 404}
			La pagina che stai cercando non esiste o è stata spostata.
		{:else}
			{page.error?.message ?? 'Si è verificato un errore.'}
		{/if}
	</p>

	<a
		href="/"
		class="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
	>
		← Torna alla homepage
	</a>
</div>
