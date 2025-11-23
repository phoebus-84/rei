<script>
	import { Button } from '$lib/components/ui/button';
	import { buttonVariants } from '$lib/components/ui/button';
	// import { HeroCards } from '../HeroCards';
	// import { GitHubLogoIcon } from '@radix-ui/react-icons';
</script>

<section class="container grid place-items-center gap-10 py-10 md:py-20 lg:grid-cols-2">
	<div class="space-y-6 text-center lg:text-start">
		<main class="text-5xl font-bold md:text-6xl">
			<h1 class="inline">
				<span
					class="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent"
				>
					Paons
				</span> immobiliare
			</h1>
			la
			<h2 class="inline">
				<span
					class="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-transparent"
				>
					Casa
				</span> di chi cerca casa
			</h2>
		</main>

		<p class="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
			La tua casa, il tuo investimento. Affidati ai nostri esperti per compravendite, gestione
			locazioni, e molto altro ad Ivrea e dintorni.
		</p>

		<div class="space-y-4 md:space-x-4 md:space-y-0">
			<Button class="w-full md:w-1/3">Richiedi una consulenza</Button>

			<a
				rel="noreferrer noopener"
				href="https://github.com/leoMirandaa/shadcn-landing-page.git"
				target="_blank"
				class="w-full md:w-1/3 {buttonVariants({ variant: 'outline' })}"
			>
				Vedi i nostri annunci
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
