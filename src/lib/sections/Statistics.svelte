<script lang="ts">
	interface StatsProps {
		quantity: string;
		description: string;
	}

	const stats: StatsProps[] = [
		{
			quantity: '150+',
			description: 'Immobili gestiti'
		},
		{
			quantity: '40gg',
			description: 'Tempo medio vendita'
		},
		{
			quantity: '100%',
			description: 'Valutazioni reali'
		},
		{
			quantity: '2023',
			description: 'Anno fondazione'
		}
	];
</script>

<section id="statistics">
	<div class="grid grid-cols-2 gap-8 lg:grid-cols-4">
		{#each stats as { quantity, description }}
			<div class="space-y-2 text-center">
				<h2 class="text-3xl font-bold sm:text-4xl">{quantity}</h2>
				<p class="text-xl text-muted-foreground">{description}</p>
			</div>
		{/each}
	</div>
</section>
