<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { Phone } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let visible = false;
	let buttonsEl: HTMLDivElement;

	onMount(() => {
		// Trigger entrance animation
		requestAnimationFrame(() => {
			visible = true;
		});

		// Spring-physics magnetic hover on CTA buttons
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced || !buttonsEl) return;

		const links = buttonsEl.querySelectorAll('a');
		const MAGNETIC_RANGE = 80; // px range of magnetic pull
		const SPRING_STIFFNESS = 0.08;
		const SPRING_DAMPING = 0.7;

		links.forEach((link) => {
			let x = 0, y = 0;
			let vx = 0, vy = 0;
			let targetX = 0, targetY = 0;
			let animating = false;

			function tick() {
				const dx = targetX - x;
				const dy = targetY - y;
				vx = (vx + dx * SPRING_STIFFNESS) * SPRING_DAMPING;
				vy = (vy + dy * SPRING_STIFFNESS) * SPRING_DAMPING;
				x += vx;
				y += vy;

				(link as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;

				if (Math.abs(vx) > 0.01 || Math.abs(vy) > 0.01 || Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
					requestAnimationFrame(tick);
				} else {
					animating = false;
					(link as HTMLElement).style.transform = '';
				}
			}

			function startSpring() {
				if (!animating) {
					animating = true;
					requestAnimationFrame(tick);
				}
			}

			link.addEventListener('mousemove', (e: MouseEvent) => {
				const rect = link.getBoundingClientRect();
				const cx = rect.left + rect.width / 2;
				const cy = rect.top + rect.height / 2;
				const distX = e.clientX - cx;
				const distY = e.clientY - cy;
				const dist = Math.sqrt(distX * distX + distY * distY);

				if (dist < MAGNETIC_RANGE) {
					const pull = 1 - dist / MAGNETIC_RANGE;
					targetX = distX * pull * 0.35;
					targetY = distY * pull * 0.35;
				} else {
					targetX = 0;
					targetY = 0;
				}
				startSpring();
			});

			link.addEventListener('mouseleave', () => {
				targetX = 0;
				targetY = 0;
				startSpring();
			});
		});
	});
</script>

<section class="hero-section relative min-h-[60vh] flex items-center py-20 md:py-32 overflow-hidden" aria-labelledby="hero-heading">
	<!-- Warm gradient wash -->
	<div class="hero-gradient absolute inset-0 -z-10" aria-hidden="true"></div>

	<!-- Film grain texture -->
	<svg class="absolute inset-0 -z-10 h-full w-full opacity-[0.035]" aria-hidden="true">
		<filter id="hero-grain">
			<feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
			<feColorMatrix type="saturate" values="0" />
		</filter>
		<rect width="100%" height="100%" filter="url(#hero-grain)" />
	</svg>

	<div class="container flex flex-col items-center gap-10 lg:items-start">
		<div class="space-y-8 text-center lg:text-start">
			<h1
				id="hero-heading"
				class="font-display text-fluid-hero tracking-tight hero-reveal"
				class:hero-visible={visible}
			>
				<span class="hero-word hero-word-1 text-accent">REI</span>
				<span class="hero-word hero-word-2">Valorizziamo il tuo</span>
				<span class="hero-word hero-word-3"><span class="text-primary">patrimonio</span> immobiliare.</span>
			</h1>

			<p
				class="mx-auto text-xl leading-relaxed text-muted-foreground md:w-10/12 lg:mx-0 hero-fade"
				class:hero-visible={visible}
			>
				Strategie di vendita avanzate e gestione asset a Ivrea e nel Canavese. Non svendere,
				massimizza.
			</p>

			<div
				bind:this={buttonsEl}
				class="space-y-4 md:flex md:space-x-4 md:space-y-0 hero-fade hero-fade-delay"
				class:hero-visible={visible}
			>
				<a
					href="/valutazione"
					class={`w-full md:w-auto ${buttonVariants({ variant: 'default', size: 'lg' })}`}
				>
					Richiedi Valutazione
				</a>

				<a
					href="/immobili"
					class={`w-full md:w-auto ${buttonVariants({ variant: 'outline', size: 'lg' })}`}
				>
					Vedi Immobili
				</a>
			</div>

			<a
				href="tel:+390125282335"
				class="inline-flex items-center gap-2 py-2 text-muted-foreground transition-colors hover:text-primary hero-fade hero-fade-delay-2"
				class:hero-visible={visible}
			>
				<Phone class="h-4 w-4" />
				<span>+39 0125 282335</span>
			</a>
		</div>
	</div>
</section>

<style>
	/* --- Staggered text reveal --- */
	.hero-word {
		display: block;
		opacity: 0;
		transform: translateY(1.2em);
		transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
					transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-word-1 { transition-delay: 0.1s; }
	.hero-word-2 { transition-delay: 0.3s; }
	.hero-word-3 { transition-delay: 0.5s; }

	.hero-visible .hero-word {
		opacity: 1;
		transform: translateY(0);
	}

	/* --- Fade-in for subtitle + CTAs --- */
	.hero-fade {
		opacity: 0;
		transform: translateY(1rem);
		transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
					transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.hero-fade-delay { transition-delay: 0.7s; }
	.hero-fade-delay-2 { transition-delay: 0.9s; }

	.hero-fade.hero-visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* --- Warm gradient wash --- */
	.hero-gradient {
		background:
			radial-gradient(ellipse 80% 60% at 20% 80%, hsl(30 30% 92% / 0.6), transparent),
			radial-gradient(ellipse 60% 50% at 80% 20%, hsl(14 40% 93% / 0.5), transparent),
			radial-gradient(ellipse 90% 70% at 50% 50%, hsl(40 25% 96%), hsl(40 25% 98%));
		background-size: 200% 200%, 200% 200%, 100% 100%;
		animation: hero-gradient-drift 20s ease-in-out infinite alternate;
	}

	@keyframes hero-gradient-drift {
		0% { background-position: 0% 0%, 100% 100%, center; }
		100% { background-position: 100% 100%, 0% 0%, center; }
	}

	/* --- Respect reduced motion --- */
	@media (prefers-reduced-motion: reduce) {
		.hero-word,
		.hero-fade {
			opacity: 1;
			transform: none;
			transition: none;
		}
		.hero-gradient {
			animation: none;
		}
	}
</style>