<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
	import image from '../assets/ivrea.png';
	import image2 from '../assets/consulenze.png';
	import image3 from '../assets/people.png';
	import image4 from '../assets/sold.png'

	interface FeatureProps {
		title: string;
		description: string;
		image: string;
	}

	const sellerFeatures: FeatureProps[] = [
		{
			title: 'Vendite strategiche',
			description:
				'Contratti strutturati con condizione risolutiva e strumenti tecnici avanzati per proteggere venditore e acquirente e ridurre il rischio di sorprese.',
			image: image2
		},
		{
			title: 'Gestione patrimoniale',
			description:
				'Pianificazione di locazioni, rinnovi e strategie di rendimento pensate per proprietari che vedono l’immobile come un asset, non solo come una casa.',
			image: image
		},
		{
			title: 'Collaborazione totale',
			description:
				'Lavoriamo in sinergia con altre agenzie selezionate per ampliare la visibilità degli immobili e chiudere le trattative più velocemente, senza guerre di bandiera.',
			image: image3
		}
	];

	const buyerFeatures: FeatureProps[] = [
		{
            title: 'Percorso dedicato agli acquirenti',
            description:
                'Ti accompagniamo dalla prima visita al rogito, analizzando documenti, verifiche urbanistiche e sostenibilità del mutuo per farti scegliere in sicurezza la casa giusta per te.',
            image: image4
        },
		{
            title: 'Soluzioni per chi non accede al mutuo',
            description:
                'Se oggi non puoi ottenere un mutuo tradizionale, ti aiutiamo a costruire un percorso alternativo: vendite a riscatto e formule personalizzate per permetterti di entrare subito in casa, pianificando l’acquisto nel tempo in modo sostenibile.',
            image: image4
        },
		{
            title: 'Ricerca casa in affitto',
            description:
                'Seguiamo chi cerca una casa in affitto selezionando immobili realistici per budget ed esigenze, spiegando in modo chiaro condizioni, tempi e oneri, così da scegliere con lucidità dove andare a vivere.',
            image: image3
        }
	];
</script>

<section id="features" class="container space-y-8 py-10 sm:py-20">
	<h2 class="text-3xl font-bold md:text-center lg:text-4xl">
		Per chi
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			possiede un immobile
		</span>
	</h2>

	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each sellerFeatures as { title, description, image }}
			<Card>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>{description}</CardContent>
				<CardFooter>
					<img src={image} alt="About feature" class="mx-auto w-[200px] lg:w-[300px]" />
				</CardFooter>
			</Card>
		{/each}
	</div>
	<h2 class="text-3xl font-bold md:text-center lg:text-4xl">
		Per chi
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			cerca un immobile
		</span>
	</h2>
	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each buyerFeatures as { title, description, image }}
			<Card>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>{description}</CardContent>
				<CardFooter>
					<img src={image} alt="About feature" class="mx-auto w-[200px] lg:w-[300px]" />
				</CardFooter>
			</Card>
		{/each}
	</div>
</section>
