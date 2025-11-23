<script>
	import { Button } from '$lib/components/ui/button';
	import { buttonVariants } from '$lib/components/ui/button';
	// import { HeroCards } from '../HeroCards';
	// import { GitHubLogoIcon } from '@radix-ui/react-icons';
</script>

<section class="container grid place-items-center gap-10 py-10 md:py-20 lg:grid-cols-2">
	<div class="space-y-6 text-center lg:text-start">
		<main class="text-4xl font-bold md:text-5xl lg:text-6xl">
			<h1 class="inline">
				<span
					class="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent"
				>
					REI
				</span>
			</h1>
			<h2 class="inline">
				Valorizziamo il tuo
				<span
					class="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-transparent"
				>
					patrimonio
				</span> immobiliare.
			</h2>
		</main>

		<p class="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
			Strategie di vendita avanzate e gestione asset a Ivrea e nel Canavese. Non svendere,
			massimizza.
		</p>

		<div class="space-y-4 md:flex md:space-x-4 md:space-y-0">
			<Button class="w-full md:w-1/3">Richiedi Valutazione</Button>

			<a
				rel="noreferrer noopener"
				href="#immobili"
				class={`w-full md:w-1/3 ${buttonVariants({ variant: 'outline' })}`}
			>
				Vedi Immobili
			</a>
		</div>
	</div>

	<!-- Hero cards sections -->
	<div class="z-10">
		<!-- <HeroCards /> -->
	</div>

	<!-- Shadow effect -->
	<div class="shadow"></div>
</section>
