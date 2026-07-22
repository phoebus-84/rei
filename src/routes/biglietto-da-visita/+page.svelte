<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import { buttonVariants } from '$lib/components/ui/button';
	import { Phone, Mail, MapPin, Globe, Download, Printer } from 'lucide-svelte';
	import logo from '$lib/assets/logo.png';

	// ── Card content ────────────────────────────────────────────────────────
	const card = {
		name: 'REI',
		tagline: 'Real Estate Invest',
		role: 'Valorizziamo il tuo patrimonio immobiliare',
		phone: '+39 0125 282335',
		email: 'info@reicasa.it',
		address: 'Via Jervis — Ivrea (TO)',
		web: 'reicasa.it',
		url: 'https://reicasa.it'
	};

	// ── QR code generation ──────────────────────────────────────────────────
	let qrSvg = $state<string>('');
	let cardEl: HTMLDivElement | undefined = $state();
	let tiltFront: HTMLDivElement | undefined = $state();
	let tiltBack: HTMLDivElement | undefined = $state();

	onMount(async () => {
		// Warm teal foreground + transparent background. The central logo chip
		// is overlaid as SVG below, with 'H' error correction so it reads fine.
		qrSvg = await QRCode.toString(card.url, {
			type: 'svg',
			errorCorrectionLevel: 'H',
			margin: 0,
			color: {
				dark: '#2d7a74', // brand teal
				light: '#00000000'
			}
		});

		// Subtle 3D tilt on hover (desktop only) — echoes the hero's magnetic feel.
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) return;
		[tiltFront, tiltBack].forEach((el) => {
			if (!el) return;
			const onMove = (e: MouseEvent) => {
				const r = el.getBoundingClientRect();
				const px = (e.clientX - r.left) / r.width - 0.5;
				const py = (e.clientY - r.top) / r.height - 0.5;
				el.style.transform = `perspective(1200px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-2px)`;
			};
			const onLeave = () => {
				el.style.transform = '';
			};
			el.addEventListener('mousemove', onMove);
			el.addEventListener('mouseleave', onLeave);
		});
	});

	function handlePrint() {
		window.print();
	}

	async function handleDownloadVCard() {
		const vcf = [
			'BEGIN:VCARD',
			'VERSION:3.0',
			'FN:REI Casa',
			'ORG:REI — Real Estate Invest',
			`TEL;TYPE=WORK,VOICE:${card.phone}`,
			`EMAIL;TYPE=WORK:${card.email}`,
			`ADR;TYPE=WORK:;;${card.address};;;;Italy`,
			`URL:${card.url}`,
			'END:VCARD'
		].join('\n');
		const blob = new Blob([vcf], { type: 'text/vcard' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = 'reicasa.vcf';
		a.click();
		URL.revokeObjectURL(a.href);
	}
</script>

<svelte:head>
	<title>Biglietto da Visita — REI Casa</title>
	<meta
		name="description"
		content="Biglietto da visita digitale di REI Casa — Real Estate Invest, agenzia a Ivrea e nel Canavese."
	/>
</svelte:head>

<section class="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden py-16 md:py-24">
	<!-- Warm gradient wash (same recipe as the hero) -->
	<div class="page-gradient absolute inset-0 -z-10" aria-hidden="true"></div>

	<!-- Film grain -->
	<svg class="absolute inset-0 -z-10 h-full w-full opacity-[0.04]" aria-hidden="true">
		<filter id="bdv-grain">
			<feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
			<feColorMatrix type="saturate" values="0" />
		</filter>
		<rect width="100%" height="100%" filter="url(#bdv-grain)" />
	</svg>

	<div bind:this={cardEl} class="container flex flex-col items-center gap-10">
		<header class="max-w-2xl space-y-4 text-center">
			<span
				class="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent"
			>
				Biglietto da visita
			</span>
			<h1 class="font-display text-fluid-sub font-bold tracking-tight">
				<span class="text-accent">Un saluto</span> dalle nostre parti.
			</h1>
			<p class="text-base leading-relaxed text-muted-foreground md:text-lg">
				Tieni con te i nostri contatti. Scansiona il QR per aprire il sito, oppure scarica la
				rubrica già pronta.
			</p>
		</header>

		<!-- ── The business card: front + back ──────────────────────────── -->
		<div class="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-10">
			<!-- FRONT ------------------------------------------------------ -->
			<article
				bind:this={tiltFront}
				class="card-face front relative aspect-[1.7/1] w-[min(92vw,28rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_20px_60px_-20px_rgba(45,122,116,0.35)]"
				aria-label="Fronte del biglietto da visita"
			>
				<!-- soft warm wash -->
				<div class="absolute inset-0 front-wash" aria-hidden="true"></div>

				<!-- line-art rooftops silhouette (echoes the Ivrea illustration) -->
				<svg
					class="absolute inset-x-0 bottom-0 w-full text-primary/35"
					viewBox="0 0 400 120"
					fill="none"
					aria-hidden="true"
				>
					<!-- distant mountains -->
					<path
						d="M0 78 L40 62 L70 74 L110 54 L150 70 L190 58 L230 72 L270 56 L310 70 L350 60 L400 74 L400 120 L0 120 Z"
						fill="currentColor"
						opacity="0.25"
					/>
					<!-- river arch bridge -->
					<path
						d="M120 95 Q200 60 280 95"
						stroke="currentColor"
						stroke-width="1.5"
						fill="none"
					/>
					<path d="M120 95 L120 115 M280 95 L280 115" stroke="currentColor" stroke-width="1.5" />
					<!-- tiny rooftops row -->
					<g stroke="currentColor" stroke-width="1.25" fill="none" opacity="0.85">
						<path d="M20 100 L35 88 L50 100 L50 115 L20 115 Z" />
						<path d="M50 100 L62 92 L74 100 L74 115 L50 115 Z" />
						<path d="M330 100 L345 88 L360 100 L360 115 L330 115 Z" />
						<path d="M360 100 L372 92 L384 100 L384 115 L360 115 Z" />
					</g>
					<!-- river reflection lines -->
					<g stroke="currentColor" stroke-width="0.8" opacity="0.4">
						<line x1="150" y1="108" x2="170" y2="108" />
						<line x1="200" y1="111" x2="230" y2="111" />
						<line x1="240" y1="108" x2="255" y2="108" />
					</g>
				</svg>

				<!-- subtle corner accent arc -->
				<svg
					class="absolute -right-8 -top-8 h-28 w-28 text-accent/25"
					viewBox="0 0 100 100"
					aria-hidden="true"
				>
					<circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="1.5" fill="none" />
					<circle cx="50" cy="50" r="26" stroke="currentColor" stroke-width="1" fill="none" />
				</svg>

				<div class="relative flex h-full flex-col justify-between p-6 md:p-8">
					<div class="flex items-start gap-3">
						<img src={logo} alt="" class="h-12 w-auto drop-shadow-sm" />
					</div>

					<div class="space-y-1.5">
						<div class="flex items-baseline gap-2">
							<span class="font-display text-5xl font-bold leading-none tracking-tight text-accent">
								{card.name}
							</span>
							<span class="font-display text-base font-medium tracking-[0.2em] text-primary">
								IMMOBILIARE
							</span>
						</div>
						<p class="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
							{card.tagline}
						</p>
						<p class="pt-2 max-w-[24ch] text-xs leading-snug text-foreground/70">
							{card.role}
						</p>
					</div>
				</div>
			</article>

			<!-- BACK ------------------------------------------------------- -->
			<article
				bind:this={tiltBack}
				class="card-face back relative aspect-[1.7/1] w-[min(92vw,28rem)] overflow-hidden rounded-2xl border border-border bg-primary text-primary-foreground shadow-[0_20px_60px_-20px_rgba(45,122,116,0.5)]"
				aria-label="Retro del biglietto da visita"
			>
				<!-- warm radial glow -->
				<div class="absolute inset-0 back-wash" aria-hidden="true"></div>

				<!-- corner rooftops accent -->
				<svg
					class="absolute -left-6 -top-6 h-24 w-24 text-white/15"
					viewBox="0 0 100 100"
					aria-hidden="true"
				>
					<path
						d="M10 60 L30 42 L50 60 L50 90 L10 90 Z"
						stroke="currentColor"
						stroke-width="1.5"
						fill="none"
					/>
					<path
						d="M45 60 L60 48 L75 60 L75 90 L45 90 Z"
						stroke="currentColor"
						stroke-width="1.5"
						fill="none"
					/>
					<line x1="30" y1="42" x2="30" y2="35" stroke="currentColor" stroke-width="1.5" />
				</svg>

				<div class="relative grid h-full grid-cols-5 gap-4 p-6 md:p-7">
					<!-- Contacts -->
					<div class="col-span-3 flex flex-col justify-center gap-2.5">
						<span
							class="font-display text-[0.65rem] uppercase tracking-[0.25em] text-white/70"
						>
							Contatti
						</span>

						<a
							href="tel:+390125282335"
							class="group flex items-center gap-2.5 text-sm transition-colors hover:text-brand-amber"
						>
							<Phone class="h-3.5 w-3.5 shrink-0 opacity-80" />
							<span class="font-medium tracking-tight">{card.phone}</span>
						</a>

						<a
							href="mailto:info@reicasa.it"
							class="group flex items-center gap-2.5 text-sm transition-colors hover:text-brand-amber"
						>
							<Mail class="h-3.5 w-3.5 shrink-0 opacity-80" />
							<span class="font-medium tracking-tight">{card.email}</span>
						</a>

						<div class="flex items-center gap-2.5 text-sm">
							<MapPin class="h-3.5 w-3.5 shrink-0 opacity-80" />
							<span class="font-medium tracking-tight">{card.address}</span>
						</div>

						<div class="flex items-center gap-2.5 text-sm">
							<Globe class="h-3.5 w-3.5 shrink-0 opacity-80" />
							<span class="font-medium tracking-tight">{card.web}</span>
						</div>
					</div>

					<!-- QR -->
					<div class="col-span-2 flex flex-col items-center justify-center gap-2">
						<div
							class="qr-chip relative flex aspect-square w-[7.5rem] items-center justify-center rounded-xl bg-white p-2 shadow-lg md:w-[8rem]"
						>
							{#if qrSvg}
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								<div class="qr-svg h-full w-full">{@html qrSvg}</div>
							{:else}
								<div class="h-full w-full animate-pulse rounded-md bg-muted"></div>
							{/if}

							<!-- Center logo chip overlay -->
							<div
								class="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border-2 border-white bg-white shadow-md ring-1 ring-primary/10 md:h-9 md:w-9"
							>
								<img src={logo} alt="" class="h-full w-full object-contain p-0.5" />
							</div>
						</div>
						<span class="text-[0.6rem] uppercase tracking-[0.2em] text-white/60">
							Scansiona &middot; rei
						</span>
					</div>
				</div>

				<!-- bottom rule -->
				<div
					class="pointer-events-none absolute inset-x-6 bottom-3 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.25em] text-white/50"
					aria-hidden="true"
				>
					<span>Ivrea &middot; Canavese</span>
					<span class="font-display tracking-[0.3em]">REI</span>
				</div>
			</article>
		</div>

		<!-- Actions -->
		<div class="no-print flex flex-col items-center gap-3 pt-2 sm:flex-row">
			<button
				onclick={handleDownloadVCard}
				class={buttonVariants({ variant: 'default', size: 'lg' })}
			>
				<Download class="mr-2 h-4 w-4" />
				Salva in rubrica
			</button>
			<button
				onclick={handlePrint}
				class={buttonVariants({ variant: 'outline', size: 'lg' })}
			>
				<Printer class="mr-2 h-4 w-4" />
				Stampa biglietto
			</button>
		</div>

		<p class="no-print text-center text-xs text-muted-foreground">
			Suggerimento: stampa su carta 85&times;55&nbsp;mm per un biglietto reale.
		</p>
	</div>
</section>

<style>
	/* Warm gradient wash — same recipe used in Hero.svelte */
	.page-gradient {
		background:
			radial-gradient(ellipse 80% 60% at 20% 80%, hsl(30 30% 92% / 0.6), transparent),
			radial-gradient(ellipse 60% 50% at 80% 20%, hsl(14 40% 93% / 0.5), transparent),
			radial-gradient(ellipse 90% 70% at 50% 50%, hsl(40 25% 96%), hsl(40 25% 98%));
		background-size: 200% 200%, 200% 200%, 100% 100%;
		animation: page-gradient-drift 22s ease-in-out infinite alternate;
	}

	@keyframes page-gradient-drift {
		0% {
			background-position: 0% 0%, 100% 100%, center;
		}
		100% {
			background-position: 100% 100%, 0% 0%, center;
		}
	}

	/* ── Card surfaces ──────────────────────────────────────────────── */
	.card-face {
		transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		transform-style: preserve-3d;
		will-change: transform;
	}

	.front-wash {
		background:
			radial-gradient(ellipse 60% 70% at 90% 10%, hsl(14 65% 48% / 0.08), transparent 60%),
			radial-gradient(ellipse 80% 60% at 10% 90%, hsl(174 45% 32% / 0.1), transparent 60%),
			linear-gradient(180deg, hsl(40 25% 99%) 0%, hsl(40 25% 96%) 100%);
	}

	.back-wash {
		background:
			radial-gradient(ellipse 70% 80% at 100% 0%, hsl(14 65% 48% / 0.25), transparent 60%),
			radial-gradient(ellipse 80% 80% at 0% 100%, hsl(40 72% 52% / 0.18), transparent 60%);
	}

	/* Let the QR SVG from qrcode fill the chip */
	:global(.qr-svg svg) {
		width: 100%;
		height: 100%;
		display: block;
	}

	/* ── Print ──────────────────────────────────────────────────────── */
	@media print {
		.no-print {
			display: none !important;
		}
		:global(header),
		:global(footer) {
			display: none !important;
		}
		section {
			min-height: 0 !important;
			padding: 0 !important;
		}
		.page-gradient,
		svg[aria-hidden='true'] {
			display: none !important;
		}
		.card-face {
			box-shadow: none !important;
			border-color: #d1d5db !important;
			break-inside: avoid;
			page-break-inside: avoid;
			width: 85mm !important;
			height: 55mm !important;
			aspect-ratio: auto !important;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.page-gradient {
			animation: none;
		}
		.card-face {
			transition: none;
		}
	}
</style>
