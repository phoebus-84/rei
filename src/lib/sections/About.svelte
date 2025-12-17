<script>
	import Statistics from '$lib/sections/Statistics.svelte';
	import pilot from '../assets/profile.png';
</script>

<section class="relative bg-background py-20 transition-colors duration-300" id="about">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="rounded-3xl border border-border bg-card/50 p-8 shadow-sm md:p-12 lg:p-16">
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
				<div class="order-2 flex justify-center lg:order-1 lg:col-span-5">
					<div
						class="relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-background shadow-inner"
					>
						<img
							alt="Professional Consultant"
							class="h-full w-full object-cover opacity-90 grayscale transition-transform duration-500 hover:scale-105 hover:grayscale-0"
							src={pilot}
						/>
					</div>
				</div>
				<div class="order-1 lg:order-2 lg:col-span-7">
					<span class="mb-2 block text-sm font-bold uppercase tracking-wider text-[#D247BF]"
						>La nostra agenzia</span
					>
					<h2 class="font-display mb-6 text-3xl font-bold text-foreground md:text-4xl">
						Chi siamo
					</h2>
					<p class="mb-6 text-lg leading-relaxed text-muted-foreground">
						REI è un'agenzia giovane che parla chiaro e lavora sui numeri. Un approccio diretto,
						strumenti legali avanzati e una gestione concreta degli asset immobiliari per chi vuole
						valorizzare, non svendere.
					</p>
					<p class="mb-10 text-lg leading-relaxed text-muted-foreground">
						Lavoriamo a Ivrea e nel Canavese concentrandoci su tre pilastri: analisi reale del
						valore, strategie di vendita su misura e gestione patrimoniale efficace.
					</p>
					<Statistics />
				</div>
			</div>
		</div>
	</div>
</section>
