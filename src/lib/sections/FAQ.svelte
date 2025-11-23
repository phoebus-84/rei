<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
		AccordionContent
	} from '$lib/components/ui/accordion';

	interface FAQProps {
		question: string;
		answer: string;
		value: string;
	}

	const FAQList: FAQProps[] = [
		{
			question: "Cos'è la vendita con condizione risolutiva?",
			answer:
				'È una modalità di vendita in cui il trasferimento della proprietà è legato al verificarsi di determinate condizioni. Se non si verificano, il contratto si scioglie: è uno strumento potente per tutelare venditore e acquirente.',
			value: 'item-1'
		},
		{
			question: 'Operate solo a Ivrea?',
			answer:
				'Lavoriamo principalmente a Ivrea e nel Canavese. Per operazioni fuori zona valutiamo caso per caso, in base alla complessità dell’immobile e alla reale possibilità di portare valore.',
			value: 'item-2'
		},
		{
			question: 'Perché collaborate con altre agenzie?',
			answer:
				'Perché l’obiettivo è vendere al meglio, non difendere un logo. Condividere gli immobili con agenzie selezionate aumenta la visibilità e accelera i tempi di vendita.',
			value: 'item-3'
		},
		{
			question: 'Quanto costa una valutazione?',
			answer:
				'La prima valutazione orientativa è gratuita. Per perizie approfondite o analisi complesse definiamo insieme un compenso chiaro prima di iniziare.',
			value: 'item-4'
		}
	];
</script>

<section id="faq" class="container py-24 sm:py-32">
	<h2 class="mb-4 text-3xl font-bold md:text-4xl">
		Domande
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			frequenti
		</span>
	</h2>

	<Accordion class="AccordionRoot w-full">
		{#each FAQList as { question, answer, value } (value)}
			<AccordionItem {value}>
				<AccordionTrigger class="text-left">
					{question}
				</AccordionTrigger>
				<AccordionContent>
					{answer}
				</AccordionContent>
			</AccordionItem>
		{/each}
	</Accordion>

	<h3 class="mt-4 font-medium">
		Hai ancora dubbi?
		<a
			rel="noreferrer noopener"
			href="#contatti"
			class="border-primary text-primary transition-all hover:border-b-2">Scrivici</a
		>
	</h3>
</section>
