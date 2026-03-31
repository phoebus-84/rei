<script>
	import Statistics from '$lib/sections/Statistics.svelte';
	import pilot from '../assets/profile.webp';
	import { scrollReveal } from '$lib/utils/scroll-reveal';
</script>

<section class="relative bg-background py-20 transition-colors duration-300" id="about">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="rounded-3xl border border-border bg-card/50 p-8 shadow-sm md:p-12 lg:p-16">
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
				<div class="order-2 flex justify-center lg:order-1 lg:col-span-5">
					<div
						class="scroll-reveal-left relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-background shadow-inner"
						use:scrollReveal={{ delay: 0 }}
					>
						<img
							alt="Professional Consultant"
							class="h-full w-full object-cover opacity-90 grayscale transition-transform duration-500 hover:scale-105 hover:grayscale-0"
							src={pilot}
							loading="lazy"
							decoding="async"
							width="1024"
							height="1024"
						/>
					</div>
				</div>
				<div class="order-1 lg:order-2 lg:col-span-7">
					<span
						class="scroll-reveal-up mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-accent"
						use:scrollReveal={{ delay: 0 }}
						>Il nostro studio</span
					>
					<h2
						class="scroll-reveal-up font-display text-fluid-sub mb-6 font-bold text-foreground"
						use:scrollReveal={{ delay: 100 }}
					>
						Chi siamo
					</h2>
					<p
						class="scroll-reveal-up mb-6 text-lg leading-relaxed text-muted-foreground"
						use:scrollReveal={{ delay: 200 }}
					>
						REI è uno studio immobiliare giovane, ma con un team che porta oltre 20 anni di
						esperienza nel settore. Parliamo chiaro, lavoriamo sui numeri e offriamo strumenti
						legali avanzati e una gestione concreta degli asset immobiliari per chi vuole
						valorizzare, non svendere.
					</p>
					<p
						class="scroll-reveal-up mb-10 text-lg leading-relaxed text-muted-foreground"
						use:scrollReveal={{ delay: 350 }}
					>
						Lavoriamo nel Canavese e non solo, concentrandoci su analisi reale del valore, strategie
						di vendita su misura e gestione patrimoniale efficace.
					</p>
					<div class="scroll-reveal-up" use:scrollReveal={{ delay: 500 }}>
						<Statistics />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
