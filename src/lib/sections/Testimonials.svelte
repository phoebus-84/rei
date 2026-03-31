<script lang="ts">
	import { scrollReveal } from '$lib/utils/scroll-reveal';
	import { ShieldCheck, Handshake, Eye } from 'lucide-svelte';

	const vantaggi = [
		{
			title: 'Trasparenza totale',
			description:
				'Nessun costo nascosto, nessuna sorpresa. Ti mostriamo ogni numero, ogni documento e ogni passaggio prima di decidere insieme.',
			icon: Eye
		},
		{
			title: 'Nessun vincolo tossico',
			description:
				'Mandati chiari, durate definite e totale trasparenza sulle collaborazioni: resti con noi perché portiamo risultati, non perché sei bloccato da un contratto.',
			icon: Handshake
		},
		{
			title: 'Tutela garantita',
			description:
				'Ogni trattativa è assistita legalmente. Proteggiamo i tuoi interessi dall\u2019inizio alla fine, che tu stia vendendo, affittando o comprando.',
			icon: ShieldCheck
		}
	];

	let sectionEl: HTMLElement | undefined = $state();
	let lightX = $state(50);
	let lightY = $state(50);
	let isHovering = $state(false);
	let revealed = $state(false);
	let displayValues = $state(['0', '10', '0']);
	let reducedMotion = $state(false);

	function handleMouseMove(e: MouseEvent) {
		if (!sectionEl || reducedMotion) return;
		const rect = sectionEl.getBoundingClientRect();
		lightX = ((e.clientX - rect.left) / rect.width) * 100;
		lightY = ((e.clientY - rect.top) / rect.height) * 100;
	}

	function counterReveal(node: HTMLElement) {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reducedMotion) {
			revealed = true;
			displayValues = ['100%', '0', '\u221e'];
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !revealed) {
						revealed = true;
						animateCounters();
						observer.unobserve(node);
					}
				});
			},
			{ threshold: 0.3 }
		);
		observer.observe(node);

		return { destroy() { observer.disconnect(); } };
	}

	function animateCounters() {
		const duration = 1800;
		const start = performance.now();

		function step(now: number) {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);

			displayValues = [
				`${Math.round(eased * 100)}%`,
				String(Math.round(10 * (1 - eased))),
				progress > 0.65 ? '\u221e' : String(Math.round(eased * 99))
			];

			if (progress < 1) requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
	id="vantaggi"
	class="container relative overflow-hidden py-24 sm:py-32"
	bind:this={sectionEl}
	onmousemove={handleMouseMove}
	onmouseenter={() => {
		if (!reducedMotion) isHovering = true;
	}}
	onmouseleave={() => {
		isHovering = false;
	}}
>
	<!-- Cursor-following light -->
	<div
		class="pointer-events-none absolute inset-0 transition-opacity duration-700 {isHovering
			? 'opacity-100'
			: 'opacity-0'}"
		style="background: radial-gradient(600px circle at {lightX}% {lightY}%, hsl(var(--primary) / 0.06), transparent 70%)"
	></div>

	<h2
		class="scroll-reveal-up relative z-10 font-display text-fluid-section font-bold"
		use:scrollReveal={{ delay: 0 }}
	>
		Perché scegliere
		<span class="text-primary">REI</span>
	</h2>

	<p
		class="scroll-reveal-up relative z-10 pb-12 pt-4 text-xl text-muted-foreground"
		use:scrollReveal={{ delay: 100 }}
	>
		Siamo uno studio giovane con un team di esperienza ventennale. La nostra forza? Un approccio
		diretto dove conti tu, non il mandato.
	</p>

	<div class="relative z-10 mx-auto grid gap-8 md:grid-cols-3" use:counterReveal>
		{#each vantaggi as { title, description, icon: Icon }, idx (title)}
			<div class="scroll-reveal-up" use:scrollReveal={{ delay: 200 + idx * 150 }}>
				<div
					class="group relative rounded-2xl border border-border/50 bg-card/60 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/20 hover:bg-card/80 hover:shadow-xl hover:shadow-primary/[0.08] motion-reduce:hover:translate-y-0"
				>
					<!-- Animated number -->
					<div
						class="mb-6 font-display text-5xl font-bold tabular-nums text-primary/15 transition-colors duration-500 group-hover:text-primary/30 sm:text-6xl"
					>
						<span
							class="inline-block {revealed ? 'scale-100' : 'scale-0'}"
							style="transform-origin: bottom left; transition: transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1)"
						>
							{displayValues[idx]}
						</span>
					</div>

					<!-- Icon with hover glow -->
					<div class="relative mb-4 inline-flex">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-500 group-hover:bg-primary/15 group-hover:shadow-lg group-hover:shadow-primary/10"
						>
							<Icon
								class="h-6 w-6 text-primary transition-transform duration-500 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0"
							/>
						</div>
					</div>

					<h3 class="mb-2 text-xl font-bold text-foreground">{title}</h3>
					<p class="leading-relaxed text-muted-foreground">{description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>
