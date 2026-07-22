<script lang="ts">
	import { ArrowLeft, ArrowRight, Check, LoaderCircle, MapPinned, ShieldCheck, Sparkles } from 'lucide-svelte';

	import { buttonVariants } from '$lib/components/ui/button';
	import LocationLookup from '$lib/components/location/LocationLookup.svelte';
	import type { LocationSuggestion } from '$lib/location';
	import { scrollReveal } from '$lib/utils/scroll-reveal';
	import { resolveValuationMarketArea, type ResolvedValuationMarketArea } from '$lib/valuation/market-resolver';
	import {
		valuationConditions,
		valuationExtras,
		valuationFloors,
		type ValuationCondition,
		type ValuationExtra,
		type ValuationFloor,
		type ValuationPropertyKind
	} from '$lib/valuation/engine';
	import { valuationPrivacyVersion } from '$lib/valuation/submission';

	type StepKey = 'immobile' | 'dettagli' | 'contatti';
	type ResultState = {
		min: number;
		max: number;
		currency: string;
		resolvedMarketArea?: ResolvedValuationMarketArea | null;
	};
	type FieldIssues = Partial<Record<string, string[]>>;

	const currencyFormatter = new Intl.NumberFormat('it-IT', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 0
	});

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phonePattern = /^[+]?[(]?[0-9]{2,4}[)]?([\s.-]?[0-9]{2,6}){2,5}$/;

	const steps: Array<{
		key: StepKey;
		label: string;
		eyebrow: string;
		description: string;
	}> = [
		{
			key: 'immobile',
			label: 'Immobile',
			eyebrow: 'Passo 1',
			description: 'Zona, metratura e taglio. I dati che cambiano davvero la base di partenza.'
		},
		{
			key: 'dettagli',
			label: 'Dettagli',
			eyebrow: 'Passo 2',
			description: 'Stato, piano e pertinenze. Qui la forbice si allarga o si stringe.'
		},
		{
			key: 'contatti',
			label: 'Contatti',
			eyebrow: 'Passo 3',
			description: 'Lasciaci i recapiti: sblocchiamo la stima e ti richiamiamo con il contesto giusto.'
		}
	];

	const conditionLabels: Record<ValuationCondition, { title: string; note: string }> = {
		da_ristrutturare: {
			title: 'Da ristrutturare',
			note: 'Immobile con lavori importanti da prevedere.'
		},
		buono: {
			title: 'Buono stato',
			note: 'Abitabile da subito, con manutenzione ordinaria.'
		},
		ristrutturato: {
			title: 'Ristrutturato',
			note: 'Aggiornato in modo coerente e pronto per il mercato.'
		},
		nuova_costruzione: {
			title: 'Nuova costruzione',
			note: 'Prodotto recente o appena ultimato.'
		}
	};

	const floorLabels: Record<ValuationFloor, { title: string; note: string }> = {
		piano_terra: {
			title: 'Piano terra',
			note: 'Accesso comodo, esposizione e privacy da valutare.'
		},
		primo_piano: {
			title: 'Primo piano',
			note: 'Il riferimento neutro per il confronto.'
		},
		secondo_con_ascensore: {
			title: 'Secondo con ascensore',
			note: 'Buona percezione di comfort e accessibilità.'
		},
		secondo_senza_ascensore: {
			title: 'Secondo senza ascensore',
			note: 'Equilibrio fra luce e praticità, con una frizione in più.'
		},
		terzo_piu_con_ascensore: {
			title: 'Terzo o più, con ascensore',
			note: 'Se servito bene, il piano alto può spingere il valore.'
		},
		terzo_piu_senza_ascensore: {
			title: 'Terzo o più, senza ascensore',
			note: 'La penalizzazione qui è soprattutto commerciale.'
		},
		attico: {
			title: 'Attico',
			note: 'Prodotto raro, se l’impostazione è coerente col contesto.'
		}
	};

	const extraLabels: Record<ValuationExtra, { title: string; note: string }> = {
		box_auto_singolo: {
			title: 'Box auto singolo',
			note: 'Plus concreto nei contesti urbani.'
		},
		box_auto_doppio: {
			title: 'Box auto doppio',
			note: 'Incide di piu dove la sosta pesa.'
		},
		posto_auto_scoperto: {
			title: 'Posto auto scoperto',
			note: 'Valore lineare, utile ma meno raro.'
		},
		giardino_privato: {
			title: 'Giardino privato',
			note: 'Aumenta desiderabilita e fascia di prezzo.'
		},
		terrazzo_abitabile: {
			title: 'Terrazzo abitabile',
			note: 'Conta quando e davvero fruibile.'
		}
	};

	const methodologyPoints = [
		'Base geolocalizzata Borsino per i comuni della provincia di Torino.',
		'Correttivi su stato dell’immobile, piano e presenza di ascensore.',
		'Forbice min/max calcolata con parametri tuneable sulla base al metro quadro.'
	];

	const propertyKindLabels: Record<ValuationPropertyKind, { title: string; note: string }> = {
		appartamento: {
			title: 'Appartamento',
			note: 'Usiamo piano e accessibilita come correttivi commerciali.'
		},
		casa_intera: {
			title: 'Casa intera',
			note: 'Valutiamo l’immobile come corpo unico, anche su piu livelli.'
		}
	};
	const propertyKindOptions = (Object.entries(propertyKindLabels) as Array<
		[ValuationPropertyKind, (typeof propertyKindLabels)[ValuationPropertyKind]]
	>).map(([kind, copy]) => ({ kind, ...copy }));

	let currentStep = 0;
	let locationQuery = '';
	let selectedLocation: LocationSuggestion | null = null;
	let propertyKind: ValuationPropertyKind = 'appartamento';
	let levelsCount = 2;
	let squareMeters = 95;
	let rooms = 3;
	let condition: ValuationCondition = 'buono';
	let floor: ValuationFloor = 'primo_piano';
	let extras: Record<ValuationExtra, boolean> = {
		box_auto_singolo: false,
		box_auto_doppio: false,
		posto_auto_scoperto: false,
		giardino_privato: false,
		terrazzo_abitabile: false
	};
	let fullName = '';
	let email = '';
	let phone = '';
	let privacyAccepted = false;
	let honeypot = '';
	let startedAt = Date.now();
	let pending = false;
	let errorMessage = '';
	let fieldIssues: FieldIssues = {};
	let result: ResultState | null = null;

	function setFieldIssue(field: string, message: string) {
		fieldIssues = {
			...fieldIssues,
			[field]: [message]
		};
	}

	function clearErrors() {
		errorMessage = '';
		fieldIssues = {};
	}

	function collectStepIssues(stepIndex: number) {
		const issues: FieldIssues = {};

		if (stepIndex === 0) {
			if (!selectedLocation || locationQuery !== selectedLocation.label) {
				issues.selectedLocation = ['Seleziona una posizione precisa dai suggerimenti.'];
			} else if (!selectedMarketArea) {
				issues.selectedLocation = [
					'Questa posizione non e coperta dai dati Borsino della provincia di Torino.'
				];
			}
			if (!Number.isFinite(squareMeters) || squareMeters <= 0) {
				issues.squareMeters = ['Inserisci una metratura valida.'];
			}
			if (!Number.isFinite(rooms) || rooms < 1) {
				issues.rooms = ['Inserisci almeno un vano.'];
			}
			if (propertyKind === 'casa_intera' && (!Number.isFinite(levelsCount) || levelsCount < 1)) {
				issues.levelsCount = ['Inserisci il numero di livelli.'];
			}
		}

		if (stepIndex === 1) {
			if (!condition) issues.condition = ['Seleziona lo stato dell’immobile.'];
			if (!floor) issues.floor = ['Seleziona il piano.'];
		}

		if (stepIndex === 2) {
			if (fullName.trim().length < 2) issues.fullName = ['Inserisci nome e cognome.'];
			if (!emailPattern.test(email.trim())) issues.email = ['Inserisci un indirizzo email valido.'];
			if (!phonePattern.test(phone.trim())) issues.phone = ['Inserisci un recapito telefonico valido.'];
			if (!privacyAccepted) {
				issues.privacyAccepted = ['Serve il consenso privacy per sbloccare la stima.'];
			}
		}

		return issues;
	}

	function goToNextStep() {
		clearErrors();
		const issues = collectStepIssues(currentStep);

		if (Object.keys(issues).length > 0) {
			fieldIssues = issues;
			return;
		}

		currentStep += 1;
	}

	function goToPreviousStep() {
		clearErrors();
		currentStep = Math.max(0, currentStep - 1);
	}

	function toggleExtra(extra: ValuationExtra) {
		clearErrors();
		extras = {
			...extras,
			[extra]: !extras[extra]
		};
	}

	function selectLocation(suggestion: LocationSuggestion) {
		clearErrors();
		selectedLocation = suggestion;
	}

	function clearLocation() {
		clearErrors();
		selectedLocation = null;
	}

	function formatCurrency(value: number) {
		return currencyFormatter.format(value);
	}

	function getUtmPayload() {
		if (typeof window === 'undefined') return undefined;

		const params = new URLSearchParams(window.location.search);
		const entries = Array.from(params.entries()).filter(([key]) => key.startsWith('utm_'));

		if (entries.length === 0) return undefined;

		return Object.fromEntries(entries);
	}

	async function submitValuation() {
		clearErrors();
		const issues = collectStepIssues(2);

		if (Object.keys(issues).length > 0) {
			fieldIssues = issues;
			return;
		}

		pending = true;

		try {
			const response = await fetch('/api/valuation', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					areaKey: selectedMarketArea?.key,
					selectedLocation,
					propertyKind,
					levelsCount,
					squareMeters,
					rooms,
					condition,
					floor,
					extras,
					fullName,
					email,
					phone,
					privacyAccepted,
					privacyVersion: valuationPrivacyVersion,
					locale: 'it',
					sourceUrl: typeof window === 'undefined' ? undefined : window.location.href,
					utm: getUtmPayload(),
					startedAt,
					honeypot
				})
			});

			const data = await response.json().catch(() => ({}));

			if (!response.ok) {
				fieldIssues = data.issues?.fieldErrors ?? {};
				errorMessage = data.error ?? data.issues?.formErrors?.[0] ?? 'Invio non riuscito.';
				return;
			}

			result = data;
			currentStep = steps.length;
		} catch {
			errorMessage = 'Connessione non disponibile. Riprova tra poco.';
		} finally {
			pending = false;
		}
	}

	function restartFlow() {
		clearErrors();
		result = null;
		currentStep = 0;
		startedAt = Date.now();
	}

	$: if (selectedLocation && locationQuery !== selectedLocation.label) {
		selectedLocation = null;
	}
	$: selectedMarketArea = resolveValuationMarketArea(selectedLocation);
	$: selectedExtras = valuationExtras.filter((extra) => extras[extra]);
	$: currentStepMeta = steps[currentStep] ?? steps[steps.length - 1];
</script>

<svelte:head>
	<title>Valutazione Immobiliare Online | REI Casa</title>
	<meta
		name="description"
		content="Richiedi una stima orientativa del tuo immobile a Ivrea e nel Canavese. Zona, stato, piano e pertinenze: tre passi, poi sblocchi la valutazione REI."
	/>
</svelte:head>

<section class="relative overflow-hidden bg-[linear-gradient(180deg,hsl(40_33%_97%),hsl(40_28%_99%))]">
	<div class="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,hsl(14_58%_88%_/_0.55),transparent_52%),radial-gradient(circle_at_top_right,hsl(174_32%_84%_/_0.4),transparent_46%)]" aria-hidden="true"></div>

	<div class="container relative py-16 sm:py-20 lg:py-24">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(22rem,0.9fr)] lg:items-start">
			<div class="space-y-10">
				<div class="max-w-3xl space-y-6">
					<p
						class="scroll-reveal-up inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm"
						use:scrollReveal
					>
						<MapPinned class="h-4 w-4" />
						Ivrea, Canavese e comuni limitrofi
					</p>

					<div class="space-y-5">
						<h1 class="scroll-reveal-up font-display text-fluid-section font-bold leading-[1.02] tracking-tight text-foreground" use:scrollReveal={{ delay: 80 }}>
							Una stima seria non nasce da un form qualsiasi.
						</h1>
						<p class="scroll-reveal-up max-w-2xl text-lg leading-relaxed text-muted-foreground" use:scrollReveal={{ delay: 160 }}>
							Ti chiediamo pochi dati, ma quelli giusti: posizione, stato, piano e pertinenze.
							Solo dopo sblocchiamo la forbice di valore orientativa e ti ricontattiamo con il contesto commerciale corretto.
						</p>
					</div>

					<div class="scroll-reveal-up grid gap-4 sm:grid-cols-3" use:scrollReveal={{ delay: 240 }}>
						<div class="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_20px_60px_-35px_rgba(61,51,42,0.35)] backdrop-blur-sm">
							<p class="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">Metodo</p>
							<p class="mt-3 text-sm leading-6 text-muted-foreground">Fonti ufficiali, coefficienti locali, logica esplicita.</p>
						</div>
						<div class="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_20px_60px_-35px_rgba(61,51,42,0.35)] backdrop-blur-sm">
							<p class="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">Tempo</p>
							<p class="mt-3 text-sm leading-6 text-muted-foreground">Tre passaggi. Niente prezzo sparato a caso al primo click.</p>
						</div>
						<div class="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_20px_60px_-35px_rgba(61,51,42,0.35)] backdrop-blur-sm">
							<p class="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">Esito</p>
							<p class="mt-3 text-sm leading-6 text-muted-foreground">Ricevi una forbice orientativa, non una promessa irrealistica.</p>
						</div>
					</div>
				</div>

				<div class="rounded-[2rem] border border-border/80 bg-white p-6 shadow-[0_35px_90px_-50px_rgba(52,42,33,0.45)] sm:p-8">
					{#if result}
						<div class="space-y-8">
							<div class="space-y-4">
								<p class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
									<Check class="h-4 w-4" />
									Stima sbloccata
								</p>
								<h2 class="font-display text-fluid-sub font-bold tracking-tight text-foreground">
									La tua fascia orientativa e tra {formatCurrency(result.min)} e {formatCurrency(result.max)}.
								</h2>
								<p class="max-w-2xl text-base leading-7 text-muted-foreground">
									Questa e una valutazione iniziale utile per capire il posizionamento. La conferma reale passa sempre da documenti, comparabili e visita dell’immobile.
								</p>
							</div>

							<div class="grid gap-4 md:grid-cols-3">
								<div class="rounded-2xl bg-muted/70 p-5">
									<p class="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Zona</p>
									<p class="mt-3 text-lg font-semibold text-foreground">{result.resolvedMarketArea?.label ?? selectedMarketArea?.label}</p>
								</div>
								<div class="rounded-2xl bg-muted/70 p-5">
									<p class="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Taglio</p>
									<p class="mt-3 text-lg font-semibold text-foreground">{squareMeters} m² · {rooms} vani</p>
								</div>
								<div class="rounded-2xl bg-muted/70 p-5">
									<p class="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Profilo</p>
									<p class="mt-3 text-lg font-semibold text-foreground">{conditionLabels[condition].title}</p>
								</div>
							</div>

							<div class="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
								<div class="rounded-2xl border border-border/70 bg-[linear-gradient(180deg,hsl(40_20%_98%),hsl(35_18%_95%))] p-6">
									<p class="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">Cosa succede adesso</p>
									<p class="mt-4 text-base leading-7 text-muted-foreground">
										Se vuoi una strategia piu precisa, il passo successivo e semplice: sopralluogo, controllo documentale e posizionamento sul mercato reale di oggi.
									</p>
									<div class="mt-6 flex flex-col gap-3 sm:flex-row">
										<a href="tel:+390125282335" class={buttonVariants({ variant: 'default', size: 'lg' })}>Parla con REI</a>
										<a href="mailto:info@reicasa.it" class={buttonVariants({ variant: 'outline', size: 'lg' })}>Invia documenti</a>
									</div>
								</div>

								<div class="rounded-2xl border border-primary/15 bg-primary/5 p-6">
									<p class="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">Promemoria</p>
									<p class="mt-4 text-sm leading-6 text-muted-foreground">
										La forbice non sostituisce una perizia. Serve a capire se il prezzo percepito e allineato al territorio o se sta gia scivolando verso la svendita.
									</p>
									<button type="button" class="mt-6 text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary" on:click={restartFlow}>
										Ricomincia la simulazione
									</button>
								</div>
							</div>
						</div>
					{:else}
						<div class="space-y-8">
							<div class="flex flex-col gap-5 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
								<div class="space-y-3">
									<p class="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75">{currentStepMeta.eyebrow}</p>
									<h2 class="font-display text-fluid-sub font-bold tracking-tight text-foreground">{currentStepMeta.label}</h2>
									<p class="max-w-xl text-sm leading-6 text-muted-foreground">{currentStepMeta.description}</p>
								</div>

								<div class="flex items-center gap-3">
									{#each steps as step, index}
										<div class="flex items-center gap-3">
											<div class={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${index <= currentStep ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-muted text-muted-foreground'}`}>
												{index + 1}
											</div>
											{#if index < steps.length - 1}
												<div class={`h-px w-7 ${index < currentStep ? 'bg-primary' : 'bg-border'}`}></div>
											{/if}
										</div>
									{/each}
								</div>
							</div>

							{#if currentStep === 0}
								<div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
									<div class="space-y-6">
										<div class="space-y-3">
											<LocationLookup
												bind:value={locationQuery}
												inputId="valuation-location"
												label="Posizione precisa"
												placeholder="Cerca indirizzo, comune o frazione in Piemonte..."
												selectedLabel={selectedLocation ? `Selezionata: ${selectedLocation.label}` : ''}
												required
												onSelect={selectLocation}
												onClear={clearLocation}
											/>
											{#if fieldIssues.selectedLocation}
												<p class="text-sm text-destructive">{fieldIssues.selectedLocation[0]}</p>
											{/if}
										</div>

										<div class="space-y-3">
											<p class="text-sm font-semibold text-foreground">Tipologia</p>
											<div class="grid gap-3 sm:grid-cols-2">
												{#each propertyKindOptions as option}
													<button
														type="button"
														class={`rounded-2xl border p-4 text-left transition ${propertyKind === option.kind ? 'border-primary bg-primary/5 shadow-[0_20px_45px_-35px_rgba(45,122,116,0.9)]' : 'border-border bg-background hover:border-primary/35 hover:bg-primary/5'}`}
														on:click={() => {
															clearErrors();
															propertyKind = option.kind;
														}}
													>
														<p class="font-semibold text-foreground">{option.title}</p>
														<p class="mt-2 text-sm leading-6 text-muted-foreground">{option.note}</p>
													</button>
												{/each}
											</div>
										</div>

										<div class="grid gap-5 sm:grid-cols-2">
											<label class="block space-y-3">
												<span class="text-sm font-semibold text-foreground">Superficie commerciale</span>
												<input bind:value={squareMeters} type="number" min="1" step="1" class="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
												{#if fieldIssues.squareMeters}
													<p class="text-sm text-destructive">{fieldIssues.squareMeters[0]}</p>
												{/if}
											</label>

											<label class="block space-y-3">
												<span class="text-sm font-semibold text-foreground">Numero vani</span>
												<input bind:value={rooms} type="number" min="1" step="1" class="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
												{#if fieldIssues.rooms}
													<p class="text-sm text-destructive">{fieldIssues.rooms[0]}</p>
												{/if}
											</label>

											{#if propertyKind === 'casa_intera'}
												<label class="block space-y-3 sm:col-span-2">
													<span class="text-sm font-semibold text-foreground">Numero livelli</span>
													<input bind:value={levelsCount} type="number" min="1" max="6" step="1" class="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
													{#if fieldIssues.levelsCount}
														<p class="text-sm text-destructive">{fieldIssues.levelsCount[0]}</p>
													{/if}
												</label>
											{/if}
										</div>
									</div>

									<div class="rounded-[1.75rem] border border-brand-terracotta/15 bg-[linear-gradient(180deg,hsl(14_65%_97%),hsl(36_38%_96%))] p-6">
										<p class="text-xs font-semibold uppercase tracking-[0.22em] text-brand-terracotta">Base geolocalizzata</p>
										<div class="mt-5 space-y-3">
											<p class="font-display text-3xl font-bold tracking-tight text-foreground">{selectedMarketArea?.label ?? 'Seleziona una posizione'}</p>
											<p class="text-base leading-7 text-muted-foreground">
												{#if selectedMarketArea}
													Per questa simulazione partiamo da {formatCurrency(selectedMarketArea.pricePerSqmBase)} al metro quadro, poi correggiamo con stato, tipologia e pertinenze.
												{:else}
													Scegli un indirizzo dai suggerimenti per agganciare la base Borsino del comune corretto.
												{/if}
											</p>
										</div>
									</div>
								</div>
							{:else if currentStep === 1}
								<div class="space-y-8">
									<div class="space-y-4">
										<p class="text-sm font-semibold text-foreground">Stato dell’immobile</p>
										<div class="grid gap-4 md:grid-cols-2">
											{#each valuationConditions as option}
												<button
													type="button"
													class={`rounded-2xl border p-5 text-left transition ${condition === option ? 'border-primary bg-primary/5 shadow-[0_20px_45px_-35px_rgba(45,122,116,0.9)]' : 'border-border bg-background hover:border-primary/35 hover:bg-primary/5'}`}
													on:click={() => {
														clearErrors();
														condition = option;
													}}
												>
													<p class="font-semibold text-foreground">{conditionLabels[option].title}</p>
													<p class="mt-2 text-sm leading-6 text-muted-foreground">{conditionLabels[option].note}</p>
												</button>
											{/each}
										</div>
										{#if fieldIssues.condition}
											<p class="text-sm text-destructive">{fieldIssues.condition[0]}</p>
										{/if}
									</div>

									{#if propertyKind === 'appartamento'}
									<div class="space-y-4">
										<p class="text-sm font-semibold text-foreground">Piano e accessibilità</p>
										<div class="grid gap-4 md:grid-cols-2">
											{#each valuationFloors as option}
												<button
													type="button"
													class={`rounded-2xl border p-5 text-left transition ${floor === option ? 'border-primary bg-primary/5 shadow-[0_20px_45px_-35px_rgba(45,122,116,0.9)]' : 'border-border bg-background hover:border-primary/35 hover:bg-primary/5'}`}
													on:click={() => {
														clearErrors();
														floor = option;
													}}
												>
													<p class="font-semibold text-foreground">{floorLabels[option].title}</p>
													<p class="mt-2 text-sm leading-6 text-muted-foreground">{floorLabels[option].note}</p>
												</button>
											{/each}
										</div>
										{#if fieldIssues.floor}
											<p class="text-sm text-destructive">{fieldIssues.floor[0]}</p>
										{/if}
									</div>
									{/if}

									<div class="space-y-4">
										<p class="text-sm font-semibold text-foreground">Pertinenze che incidono</p>
										<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
											{#each valuationExtras as option}
												<button
													type="button"
													class={`rounded-2xl border p-5 text-left transition ${extras[option] ? 'border-brand-terracotta bg-brand-terracotta/10' : 'border-border bg-background hover:border-brand-terracotta/40 hover:bg-brand-terracotta/5'}`}
													on:click={() => toggleExtra(option)}
												>
													<div class="flex items-start justify-between gap-3">
														<div>
															<p class="font-semibold text-foreground">{extraLabels[option].title}</p>
															<p class="mt-2 text-sm leading-6 text-muted-foreground">{extraLabels[option].note}</p>
														</div>
														<div class={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border ${extras[option] ? 'border-brand-terracotta bg-brand-terracotta text-white' : 'border-border text-transparent'}`}>
															<Check class="h-4 w-4" />
														</div>
													</div>
												</button>
											{/each}
										</div>
									</div>
								</div>
							{:else}
								<form class="space-y-6" on:submit|preventDefault={submitValuation}>
									<div class="grid gap-5 md:grid-cols-2">
										<label class="block space-y-3 md:col-span-2">
											<span class="text-sm font-semibold text-foreground">Nome e cognome</span>
											<input bind:value={fullName} type="text" autocomplete="name" class="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
											{#if fieldIssues.fullName}
												<p class="text-sm text-destructive">{fieldIssues.fullName[0]}</p>
											{/if}
										</label>

										<label class="block space-y-3">
											<span class="text-sm font-semibold text-foreground">Email</span>
											<input bind:value={email} type="email" autocomplete="email" class="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
											{#if fieldIssues.email}
												<p class="text-sm text-destructive">{fieldIssues.email[0]}</p>
											{/if}
										</label>

										<label class="block space-y-3">
											<span class="text-sm font-semibold text-foreground">Telefono</span>
											<input bind:value={phone} type="tel" autocomplete="tel" class="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
											{#if fieldIssues.phone}
												<p class="text-sm text-destructive">{fieldIssues.phone[0]}</p>
											{/if}
										</label>
									</div>

									<div class="rounded-2xl border border-border bg-muted/40 p-5">
										<label class="flex items-start gap-3">
											<input bind:checked={privacyAccepted} type="checkbox" class="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary" />
											<span class="text-sm leading-6 text-muted-foreground">
												Acconsento al trattamento dei dati per ricevere la stima orientativa e l’eventuale ricontatto operativo da parte di REI Casa.
											</span>
										</label>
										{#if fieldIssues.privacyAccepted}
											<p class="mt-3 text-sm text-destructive">{fieldIssues.privacyAccepted[0]}</p>
										{/if}
									</div>

									<div class="hidden" aria-hidden="true">
										<label>
											Non compilare questo campo
											<input bind:value={honeypot} type="text" tabindex="-1" autocomplete="off" />
										</label>
									</div>

									<p class="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm leading-6 text-muted-foreground">
										La stima che ricevi e orientativa. Serve per capire il posizionamento corretto del tuo immobile, non per promettere un prezzo fuori mercato.
									</p>

									{#if errorMessage}
										<p class="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{errorMessage}</p>
									{/if}
								</form>
							{/if}

							<div class="flex flex-col gap-3 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
								<div class="text-sm text-muted-foreground">
									{#if currentStep === 0}
										Partiamo dalla base: posizione precisa, tipologia e metratura.
									{:else if currentStep === 1}
										Aggiungiamo gli elementi che cambiano davvero il prezzo percepito.
									{:else}
										Ultimo passaggio: sblocchi la stima e ci lasci un recapito serio.
									{/if}
								</div>

								<div class="flex flex-col gap-3 sm:flex-row">
									{#if currentStep > 0}
										<button type="button" class={buttonVariants({ variant: 'outline', size: 'lg' })} on:click={goToPreviousStep}>
											<ArrowLeft class="mr-2 h-4 w-4" />
											Indietro
										</button>
									{/if}

									{#if currentStep < 2}
										<button type="button" class={buttonVariants({ variant: 'default', size: 'lg' })} on:click={goToNextStep}>
											Continua
											<ArrowRight class="ml-2 h-4 w-4" />
										</button>
									{:else}
										<button type="button" class={buttonVariants({ variant: 'default', size: 'lg' })} on:click={submitValuation} disabled={pending}>
											{#if pending}
												<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
												Sto elaborando
											{:else}
												Sblocca la valutazione
												<Sparkles class="ml-2 h-4 w-4" />
											{/if}
										</button>
									{/if}
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>

			<aside class="lg:sticky lg:top-24">
				<div class="space-y-6 rounded-[2rem] border border-primary/12 bg-[linear-gradient(180deg,hsl(174_32%_97%),hsl(40_18%_97%))] p-6 shadow-[0_35px_90px_-55px_rgba(45,122,116,0.5)] sm:p-7">
					<div class="space-y-3 border-b border-primary/10 pb-5">
						<p class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
							<ShieldCheck class="h-4 w-4" />
							Metodo REI
						</p>
						<h2 class="font-display text-3xl font-bold tracking-tight text-foreground">Nessun numeretto a caso.</h2>
						<p class="text-sm leading-6 text-muted-foreground">
							Il modello incrocia la base di zona con correttivi commerciali reali. Prima capiamo l’immobile, poi mostriamo la forbice.
						</p>
					</div>

					<div class="space-y-4">
						<p class="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Metodo in chiaro</p>
						{#each methodologyPoints as point}
							<div class="flex items-start gap-3 rounded-2xl bg-white/70 px-4 py-4">
								<div class="mt-1 h-2.5 w-2.5 rounded-full bg-brand-amber"></div>
								<p class="text-sm leading-6 text-muted-foreground">{point}</p>
							</div>
						{/each}
					</div>

					<div class="space-y-4 rounded-[1.6rem] bg-white/75 p-5">
						<div class="flex items-center justify-between gap-4">
							<p class="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">La tua bozza</p>
											<p class="text-sm font-medium text-muted-foreground">{selectedMarketArea?.label ?? 'Posizione da scegliere'}</p>
						</div>

						<div class="grid gap-3 text-sm text-muted-foreground">
									<div class="flex items-start justify-between gap-4 border-b border-border/60 pb-3">
										<span>Posizione</span>
										<span class="max-w-[12rem] text-right font-semibold text-foreground">{selectedLocation?.label ?? 'Da scegliere'}</span>
									</div>
									<div class="flex items-center justify-between gap-4 border-b border-border/60 pb-3">
										<span>Tipologia</span>
										<span class="font-semibold text-foreground">{propertyKindLabels[propertyKind].title}</span>
									</div>
							<div class="flex items-center justify-between gap-4 border-b border-border/60 pb-3">
								<span>Superficie</span>
								<span class="font-semibold text-foreground">{squareMeters} m²</span>
							</div>
							<div class="flex items-center justify-between gap-4 border-b border-border/60 pb-3">
								<span>Vani</span>
								<span class="font-semibold text-foreground">{rooms}</span>
							</div>
							<div class="flex items-center justify-between gap-4 border-b border-border/60 pb-3">
								<span>Stato</span>
								<span class="font-semibold text-foreground">{conditionLabels[condition].title}</span>
							</div>
									<div class="flex items-center justify-between gap-4 pb-1">
								<span>Piano</span>
										<span class="text-right font-semibold text-foreground">{propertyKind === 'casa_intera' ? `${levelsCount} livelli` : floorLabels[floor].title}</span>
							</div>
						</div>

						<div class="space-y-3 pt-2">
							<p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Pertinenze attive</p>
							{#if selectedExtras.length > 0}
								<div class="flex flex-wrap gap-2">
									{#each selectedExtras as extra}
										<span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{extraLabels[extra].title}</span>
									{/each}
								</div>
							{:else}
								<p class="text-sm text-muted-foreground">Nessuna pertinenza selezionata per ora.</p>
							{/if}
						</div>
					</div>

					<div class="rounded-[1.6rem] border border-brand-terracotta/15 bg-brand-terracotta/10 p-5">
						<p class="text-xs font-semibold uppercase tracking-[0.24em] text-brand-terracotta">Nota importante</p>
						<p class="mt-3 text-sm leading-6 text-muted-foreground">
							La stima e costruita per immobili residenziali. Se hai un caso particolare, una visita resta il modo corretto per difendere davvero il valore.
						</p>
					</div>
				</div>
			</aside>
		</div>
	</div>
</section>