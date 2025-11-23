<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	const reasons = [
		{
			title: 'Stop alla svalutazione',
			description:
				'Analizziamo il reale valore di mercato e costruiamo strategie di vendita che evitano ribassi inutili e offerte al ribasso.',
			initials: 'SV'
		},
		{
			title: 'Burocrazia zero',
			description:
				'Contratti, documenti e adempimenti gestiti da noi, con un linguaggio comprensibile e un percorso guidato dalla proposta al rogito.',
			initials: 'BZ'
		},
		{
			title: 'Nessun vincolo tossico',
			description:
				'Mandati chiari, durate definite e totale trasparenza sulle collaborazioni: resti con noi perché portiamo risultati, non perché sei bloccato da un contratto.',
			initials: 'NV'
		}
	];
</script>

<section id="testimonials" class="container py-24 sm:py-32">
	<h2 class="text-3xl font-bold md:text-4xl">
		Perché scegliere
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			REI
		</span>
	</h2>

	<p class="pb-8 pt-4 text-xl text-muted-foreground">
		Non abbiamo decenni di storia, ma abbiamo idee chiare: restituire controllo ai proprietari e
		rendere ogni trattativa più trasparente e protetta.
	</p>

	<div class="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each reasons as { title, description, initials } (title)}
			<Card class="max-w-md overflow-hidden">
				<CardHeader class="flex flex-row items-center gap-4 pb-2">
					<Avatar class="border border-foreground/10 bg-muted">
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>

					<div class="flex flex-col">
						<CardTitle class="text-lg">{title}</CardTitle>
						<CardDescription>Vantaggio per chi vende con REI</CardDescription>
					</div>
				</CardHeader>

				<CardContent>{description}</CardContent>
			</Card>
		{/each}
	</div>
</section>
