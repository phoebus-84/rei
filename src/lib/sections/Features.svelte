<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$lib/components/ui/card';
	import image from '../assets/ivrea.png';
	import image2 from '../assets/consulenze.png';
	import image3 from '../assets/people.png';

	interface FeatureProps {
		title: string;
		description: string;
		image: string;
	}

	const features: FeatureProps[] = [
		{
			title: 'Responsive Design',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
			image: image2
		},
		{
			title: 'Intuitive user interface',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
			image: image
		},
		{
			title: 'AI-Powered insights',
			description:
				' Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.',
			image: image3
		}
	];

	const featureList: string[] = [
		'Dark/Light theme',
		'Reviews',
		'Features',
		'Pricing',
		'Contact form',
		'Our team',
		'Responsive design',
		'Newsletter',
		'Minimalist'
	];
</script>

<section id="features" class="container space-y-8 py-10 sm:py-20">
	<h2 class="text-3xl font-bold md:text-center lg:text-4xl">
		Many
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			Great Features
		</span>
	</h2>

	<div class="flex flex-wrap gap-4 md:justify-center">
		{#each featureList as feature}
			<div>
				<Badge variant="secondary" class="text-sm">{feature}</Badge>
			</div>
		{/each}
	</div>

	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each features as { title, description, image }}
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
