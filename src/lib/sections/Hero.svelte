<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { buttonVariants } from '$lib/components/ui/button';
	// import { HeroCards } from '../HeroCards';
</script>

<section class="relative overflow-hidden py-20 md:py-32">
	<!-- Background Blobs -->
	<div
		class="animate-blob absolute -left-4 top-0 h-72 w-72 rounded-full bg-[#D247BF] opacity-30 mix-blend-multiply blur-[100px] filter md:h-96 md:w-96"
	></div>
	<div
		class="animate-blob animation-delay-2000 absolute -right-4 top-0 h-72 w-72 rounded-full bg-[#61DAFB] opacity-30 mix-blend-multiply blur-[100px] filter md:h-96 md:w-96"
	></div>
	<div
		class="animate-blob animation-delay-4000 absolute bottom-0 left-20 h-72 w-72 rounded-full bg-[#D247BF] opacity-30 mix-blend-multiply blur-[100px] filter md:h-96 md:w-96"
	></div>

	<div class="container relative z-10 grid place-items-center gap-10 lg:grid-cols-2">
		<div class="space-y-8 text-center lg:text-start">
			<main class="text-5xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
				<h1 class="inline">
					<span
						class="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent"
					>
						REI
					</span>
				</h1>
				<h2 class="inline leading-tight">
					Valorizziamo il tuo
					<span
						class="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-transparent"
					>
						patrimonio
					</span> immobiliare.
				</h2>
			</main>

			<p class="mx-auto text-xl leading-relaxed text-muted-foreground md:w-10/12 lg:mx-0">
				Strategie di vendita avanzate e gestione asset a Ivrea e nel Canavese. Non svendere,
				massimizza.
			</p>

			<div class="space-y-4 md:flex md:space-x-4 md:space-y-0">
				<Button class="w-full text-lg md:w-1/3">Richiedi Valutazione</Button>

				<a
					rel="noreferrer noopener"
					href="/immobili"
					class={`w-full text-lg md:w-1/3 ${buttonVariants({ variant: 'outline' })}`}
				>
					Vedi Immobili
				</a>
			</div>
		</div>

		<!-- Hero cards sections -->
		<div class="z-10">
			<!-- <HeroCards /> -->
		</div>
	</div>
</section>

<style>
	@keyframes blob {
		0% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(40px, -60px) scale(1.4);
		}
		66% {
			transform: translate(-40px, 35px) scale(0.6);
		}
		100% {
			transform: translate(0px, 0px) scale(1);
		}
	}
	.animate-blob {
		animation: blob 7s infinite;
	}
	.animation-delay-2000 {
		animation-delay: 2s;
	}
	.animation-delay-4000 {
		animation-delay: 4s;
	}
</style>
