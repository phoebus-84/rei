<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
	import image from '../assets/ivrea.webp';
	import image2 from '../assets/consulenze.webp';
	import image3 from '../assets/people.webp';
	import image4 from '../assets/sold.png';
	import { scrollReveal, tilt3d } from '$lib/utils/scroll-reveal';

	interface FeatureProps {
		title: string;
		description: string;
		image: string;
		alt: string;
	}

	const sellerFeatures: FeatureProps[] = [
		{
			title: 'Vendite strategiche',
			description:
				'Contratti strutturati con condizione risolutiva e strumenti tecnici avanzati per proteggere venditore e acquirente e ridurre il rischio di sorprese.',
			image: image2,
			alt: 'Consulenza immobiliare strategica'
		},
		{
			title: 'Gestione patrimoniale e finanziaria',
			description:
				'Pianificazione di locazioni, rinnovi e strategie di rendimento. Offriamo la possibilit\u00e0 di gestire direttamente noi i canoni di locazione, sollevandoti da ogni incombenza.',
			image: image,
			alt: 'Panorama di Ivrea e il Canavese'
		},
		{
			title: 'Collaborazione totale',
			description:
				'Grazie alla collaborazione con agenzie selezionate in tutta Italia, possiamo coprire l\u2019intero stivale, ampliando la visibilit\u00e0 dei tuoi immobili e chiudendo le trattative pi\u00f9 velocemente.',
			image: image3,
			alt: 'Team di professionisti immobiliari'
		},
		{
			title: 'Vendita diversificata',
			description:
				'Se il tuo immobile lo permette, attiveremo il servizio di vendita ad acquirenti esteri attraverso portali dedicati, moltiplicando le opportunit\u00e0.',
			image: image4,
			alt: 'Vendita immobiliare internazionale'
		},
		{
			title: 'Non vendiamo a caso',
			description:
				'Facciamo una valutazione reale del tuo immobile. Se venderlo oggi significa svendere, calcoliamo il potenziale da locazione e ti mostriamo cosa pu\u00f2 rendere nei prossimi anni. Poi decidi tu.',
			image: image2,
			alt: 'Analisi e valutazione immobiliare'
		},
		{
			title: 'Documentazione immobili',
			description:
				'In sinergia con geometri, architetti e ingegneri possiamo aiutarti a recuperare o redigere la documentazione necessaria alla vendita: certificazioni energetiche, accesso agli atti e situazione catastale. Non sei mai solo.',
			image: image3,
			alt: 'Documentazione e certificazioni immobiliari'
		}
	];

	const buyerFeatures: FeatureProps[] = [
		{
			title: 'Percorso dedicato agli acquirenti',
			description:
				'Ti accompagniamo dalla prima visita al rogito, analizzando documenti, verifiche urbanistiche e sostenibilità del mutuo per farti scegliere in sicurezza la casa giusta per te.',
			image: image4,
			alt: 'Immobile venduto con successo'
		},
		{
			title: 'Soluzioni per chi non accede al mutuo',
			description:
				'Se oggi non puoi ottenere un mutuo tradizionale, ti aiutiamo a costruire un percorso alternativo: vendite a riscatto e formule personalizzate per permetterti di entrare subito in casa, pianificando l’acquisto nel tempo in modo sostenibile.',
			image: image,
			alt: 'Case nel territorio del Canavese'
		},
		{
			title: 'Ricerca casa in affitto',
			description:
				'Seguiamo chi cerca una casa in affitto selezionando immobili realistici per budget ed esigenze, spiegando in modo chiaro condizioni, tempi e oneri, così da scegliere con lucidità dove andare a vivere.',
			image: image3,
			alt: 'Famiglia che cerca casa'
		}
	];

	const landlordFeatures: FeatureProps[] = [
		{
			title: 'Locazione tutelata',
			description:
				'Ogni contratto di locazione stipulato prevede l\u2019assistenza legale, dandoti la tranquillit\u00e0, in caso di morosit\u00e0, di non trovarti solo.',
			image: image2,
			alt: 'Assistenza legale per locazioni'
		},
		{
			title: 'Massima resa, tassazione minima',
			description:
				'Attraverso i nostri canali possiamo redigere un rental report che ci permette di capire quale contratto \u00e8 pi\u00f9 conveniente per te e per il tuo inquilino.',
			image: image,
			alt: 'Analisi rendimento locazione'
		},
		{
			title: 'Gestione utenze',
			description:
				'Per evitare sorprese, sia per il proprietario che per l\u2019inquilino, ci possiamo occupare noi di volturare o allacciare le utenze di luce e gas. Tutto in maniera gratuita grazie alla partnership interna.',
			image: image4,
			alt: 'Gestione utenze luce e gas'
		}
	];
</script>

<section id="features" class="container space-y-8 py-10 sm:py-20">
	<div class="mx-auto flex w-full flex-col justify-center gap-8 lg:w-3/5">
		<div class="scroll-reveal-up mx-auto w-fit" use:scrollReveal={{ delay: 0 }}>
			<Badge variant="outline">Per chi vende</Badge>
		</div>
		<h2
			class="scroll-reveal-up font-display text-fluid-section font-bold md:text-center"
			use:scrollReveal={{ delay: 100 }}
		>
			Il tuo partner immobiliare a
			<span class="text-accent">Ivrea</span>, nel Canavese e oltre
		</h2>
		<h3
			class="scroll-reveal-up text-xl text-muted-foreground md:text-center"
			use:scrollReveal={{ delay: 200 }}
		>
			Conosciamo ogni angolo del territorio. Che tu abbia una proprietà nel centro storico di Ivrea,
			una villa in provincia di Torino o una casa vacanze in Valle d'Aosta, abbiamo il polso della
			situazione locale.
		</h3>
	</div>

	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each sellerFeatures as { title, description, image, alt }, idx}
			<div
				class="scroll-reveal-up"
				use:scrollReveal={{ delay: 300 + idx * 120 }}
				use:tilt3d={{ intensity: 8 }}
			>
				<Card>
					<CardHeader>
						<CardTitle class="text-2xl text-foreground">{title}</CardTitle>
					</CardHeader>
					<CardContent class="text-muted-foreground">{description}</CardContent>
					<CardFooter>
					<img src={image} {alt} class="mx-auto w-[200px] lg:w-[300px]" loading="lazy" decoding="async" />
					</CardFooter>
				</Card>
			</div>
		{/each}
	</div>
</section>

<section class="bg-muted/40 py-10 sm:py-20">
	<div class="container space-y-8">
	<div class="mx-auto flex w-full flex-col justify-center gap-8 lg:w-3/5">
		<div class="scroll-reveal-up mx-auto w-fit" use:scrollReveal={{ delay: 0 }}>
			<Badge variant="outline">Per chi affitta</Badge>
		</div>
		<h2
			class="scroll-reveal-up font-display text-fluid-section font-bold md:text-center"
			use:scrollReveal={{ delay: 100 }}
		>
			Affitta il tuo immobile in
			<span class="text-accent">totale sicurezza</span>
		</h2>
		<h3
			class="scroll-reveal-up text-xl text-muted-foreground md:text-center"
			use:scrollReveal={{ delay: 200 }}
		>
			Gestiamo ogni aspetto della locazione: dalla scelta del contratto più vantaggioso alla tutela
			legale, fino alla gestione delle utenze. Tu incassi, noi pensiamo al resto.
		</h3>
	</div>

	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each landlordFeatures as { title, description, image, alt }, idx}
			<div
				class="scroll-reveal-up"
				use:scrollReveal={{ delay: 300 + idx * 120 }}
				use:tilt3d={{ intensity: 8 }}
			>
				<Card>
					<CardHeader>
						<CardTitle class="text-2xl text-foreground">{title}</CardTitle>
					</CardHeader>
					<CardContent class="text-muted-foreground">{description}</CardContent>
					<CardFooter>
						<img src={image} {alt} class="mx-auto w-[200px] lg:w-[300px]" loading="lazy" decoding="async" />
					</CardFooter>
				</Card>
			</div>
		{/each}
	</div>
	</div>
</section>

<section class="py-10 sm:py-20">
	<div class="container space-y-8">
	<div class="mx-auto flex w-full flex-col justify-center gap-8 lg:w-3/5">
		<div class="scroll-reveal-up mx-auto w-fit" use:scrollReveal={{ delay: 0 }}>
			<Badge variant="outline">Per chi cerca casa</Badge>
		</div>
		<h2
			class="scroll-reveal-up font-display text-fluid-section font-bold md:text-center"
			use:scrollReveal={{ delay: 100 }}
		>
			Cerchi casa? Compra o affitta al
			<span class="text-accent">prezzo giusto</span>
		</h2>
		<h3
			class="scroll-reveal-up text-xl text-muted-foreground md:text-center"
			use:scrollReveal={{ delay: 200 }}
		>
			Se stai cercando la casa per la tua famiglia, affidati a chi conosce il valore reale del
			mattone. Niente visite a immobili fuori prezzo o con problemi nascosti. Ti guidiamo verso
			l'acquisto perfetto o la locazione ideale, con trasparenza totale.
		</h3>
	</div>

	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each buyerFeatures as { title, description, image, alt }, idx}
			<div
				class="scroll-reveal-up"
				use:scrollReveal={{ delay: 300 + idx * 120 }}
				use:tilt3d={{ intensity: 8 }}
			>
				<Card>
					<CardHeader>
						<CardTitle class="text-2xl text-foreground">{title}</CardTitle>
					</CardHeader>
					<CardContent class="text-muted-foreground">{description}</CardContent>
					<CardFooter>
						<img src={image} {alt} class="mx-auto w-[200px] lg:w-[300px]" loading="lazy" decoding="async" />
					</CardFooter>
				</Card>
			</div>
		{/each}
	</div>
	</div>
</section>
