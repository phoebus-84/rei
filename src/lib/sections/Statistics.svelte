<script lang="ts">
	interface StatsProps {
		quantity: string;
		description: string;
		colorClass?: string;
	}

	const stats: StatsProps[] = [
		{
			quantity: '150+',
			description: 'Immobili gestiti',
			colorClass: 'bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent'
		},
		{
			quantity: '40gg',
			description: 'Tempo medio',
			colorClass:
				'bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-transparent'
		},
		{
			quantity: '100%',
			description: 'Valutazioni reali',
			colorClass: 'text-foreground'
		},
		{
			quantity: '2023',
			description: 'Anno fondazione',
			colorClass: 'text-foreground'
		}
	];

	function animateCount(node: HTMLElement, { value }: { value: string }) {
		const match = value.match(/^(\d+)(.*)$/);
		if (!match) return;

		const target = parseInt(match[1], 10);
		const suffix = match[2];
		const duration = 1000;

		// Set initial value
		node.textContent = `0${suffix}`;

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const startTime = performance.now();

					const step = (currentTime: number) => {
						const elapsed = currentTime - startTime;
						const progress = Math.min(elapsed / duration, 1);
						// Ease out quart
						// const ease = 1 - Math.pow(1 - progress, 4);
						// Ease in out cubic
						const ease = progress < 0.5
							? 4 * progress * progress * progress
							: 1 - Math.pow(-2 * progress + 2, 3) / 2;

						const current = Math.floor(ease * target);
						node.textContent = `${current}${suffix}`;

						if (progress < 1) {
							requestAnimationFrame(step);
						} else {
							node.textContent = value;
						}
					};

					requestAnimationFrame(step);
					observer.disconnect();
				}
			});
		});

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<div class="grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4">
	{#each stats as { quantity, description, colorClass }}
		<div class="text-center md:text-left">
			<div
				class="font-display text-3xl font-bold {colorClass}"
				use:animateCount={{ value: quantity }}
			>
				{quantity}
			</div>
			<div class="text-sm font-medium text-muted-foreground">{description}</div>
		</div>
	{/each}
</div>
