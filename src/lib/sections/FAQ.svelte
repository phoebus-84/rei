<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
		AccordionContent
	} from '$lib/components/ui/accordion';
	import { scrollReveal } from '$lib/utils/scroll-reveal';

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
	<h2
		class="scroll-reveal-up mb-4 font-display text-fluid-section font-bold"
		use:scrollReveal={{ delay: 0 }}
	>
		Domande
		<span class="text-primary">
			frequenti
		</span>
	</h2>

	<Accordion class="AccordionRoot w-full">
		{#each FAQList as { question, answer, value }, idx (value)}
			<div
				class="scroll-reveal-up"
				use:scrollReveal={{ delay: 100 + idx * 100 }}
			>
			<AccordionItem {value}>
				<AccordionTrigger class="text-left">
					{question}
				</AccordionTrigger>
				<AccordionContent>
					{answer}
				</AccordionContent>
			</AccordionItem>
			</div>
		{/each}
	</Accordion>

	<h3
		class="scroll-reveal-up mt-4 font-medium"
		use:scrollReveal={{ delay: 500 }}
	>
		Hai ancora dubbi?
		<a
			href="mailto:info@reicasa.it"
			class="border-primary text-primary transition-all hover:border-b-2">Scrivici</a
		>
	</h3>
</section>
