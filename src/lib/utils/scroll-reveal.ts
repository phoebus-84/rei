/**
 * Svelte action: adds 'scroll-revealed' class when element enters viewport.
 * Pair with CSS classes like .scroll-reveal-up, .scroll-reveal-clip, etc.
 */
export function scrollReveal(
	node: HTMLElement,
	options: { delay?: number; threshold?: number } = {}
) {
	const { delay = 0, threshold = 0.15 } = options;

	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced) {
		node.classList.add('scroll-revealed');
		return;
	}

	if (delay > 0) {
		node.style.transitionDelay = `${delay}ms`;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.classList.add('scroll-revealed');
					observer.unobserve(node);
				}
			});
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

/**
 * Svelte action: 3D perspective tilt on mouse hover.
 * Cherry-picked from Direction 2 for feature cards.
 */
export function tilt3d(node: HTMLElement, options: { intensity?: number } = {}) {
	const { intensity = 8 } = options;

	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced) return;

	node.style.transformStyle = 'preserve-3d';

	function handleMouseEnter() {
		node.style.willChange = 'transform';
	}

	function handleMouseMove(e: MouseEvent) {
		const rect = node.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;

		node.style.transition = 'transform 0.1s ease-out';
		node.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02, 1.02, 1.02)`;
	}

	function handleMouseLeave() {
		node.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
		node.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
		// Remove will-change after transition completes to free GPU layer
		setTimeout(() => {
			node.style.willChange = '';
		}, 500);
	}

	node.addEventListener('mouseenter', handleMouseEnter);
	node.addEventListener('mousemove', handleMouseMove);
	node.addEventListener('mouseleave', handleMouseLeave);

	return {
		destroy() {
			node.removeEventListener('mouseenter', handleMouseEnter);
			node.removeEventListener('mousemove', handleMouseMove);
			node.removeEventListener('mouseleave', handleMouseLeave);
		}
	};
}
