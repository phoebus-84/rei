<script>
	import Statistics from '$lib/sections/Statistics.svelte';
	import pilot from '../assets/profile.png';
</script>

<section id="about" class="container py-10 sm:py-20">
	<div class="rounded-lg border bg-muted/50 py-12">
		<div class="flex flex-col-reverse gap-8 px-6 md:flex-row md:gap-12">
			<img src={pilot} alt="" class="w-[300px] rounded-lg object-contain" />
			<div class="bg-green-0 flex flex-col justify-between">
				<div class="pb-6">
					<h2 class="text-3xl font-bold md:text-4xl">Chi siamo</h2>
					<p class="mt-4 text-xl text-muted-foreground">
						REI è un'agenzia giovane che parla chiaro e lavora sui numeri. Un approccio diretto,
						strumenti legali avanzati e una gestione concreta degli asset immobiliari per chi vuole
						valorizzare, non svendere.
					</p>
					<p class="mt-4 text-lg text-muted-foreground">
						Lavoriamo a Ivrea e nel Canavese concentrandoci su tre pilastri: analisi reale del
						valore, strategie di vendita su misura e gestione patrimoniale efficace.
					</p>
				</div>

				<Statistics />
			</div>
		</div>
	</div>
</section>
