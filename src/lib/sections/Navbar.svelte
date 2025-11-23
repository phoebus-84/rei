<script lang="ts">
	// Import components - paths may need adjustment based on project structure
	import {
		Sheet,
		SheetContent,
		SheetHeader,
		SheetTitle,
		SheetTrigger
	} from '$lib/components/ui/sheet';
	import { buttonVariants } from '$lib/components/ui/button';
	import { Menu } from 'lucide-svelte';
	// import ModeToggle from "$lib/components/mode-toggle.svelte";
	// import { GitHubLogoIcon, LogoIcon } from "$lib/components/Icons";

	// Define route interface and list
	interface RouteProps {
		href: string;
		label: string;
	}

	const routeList: RouteProps[] = [
		{ href: '#features', label: 'Features' },
		{ href: '#testimonials', label: 'Testimonials' },
		{ href: '#pricing', label: 'Pricing' },
		{ href: '#faq', label: 'FAQ' }
	];

	// State for mobile menu
	let isOpen = false;
</script>

<header
	class="sticky top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background"
>
	<nav class="mx-auto">
		<div class="container flex h-14 w-screen justify-between px-4">
			<div class="flex font-bold">
				<a rel="noreferrer noopener" href="/" class="ml-2 flex text-xl font-bold">
					<!-- <LogoIcon /> -->
					ShadcnUI/Svelte
				</a>
			</div>

			<!-- mobile -->
			<span class="flex md:hidden">
				<!-- <ModeToggle /> -->

				<Sheet bind:open={isOpen}>
					<SheetTrigger class="px-2">
						<Menu class="flex h-5 w-5 md:hidden" on:click={() => (isOpen = true)}>
							<span class="sr-only">Menu Icon</span>
						</Menu>
					</SheetTrigger>

					<SheetContent side="left">
						<SheetHeader>
							<SheetTitle class="text-xl font-bold">Shadcn/Svelte</SheetTitle>
						</SheetHeader>
						<nav class="mt-4 flex flex-col items-center justify-center gap-2">
							{#each routeList as { href, label }}
								<a
									rel="noreferrer noopener"
									{href}
									on:click={() => (isOpen = false)}
									class={buttonVariants({ variant: 'ghost' })}
								>
									{label}
								</a>
							{/each}
							<a
								rel="noreferrer noopener"
								href="https://github.com/leoMirandaa/shadcn-landing-page.git"
								target="_blank"
								class="w-[110px] border {buttonVariants({ variant: 'secondary' })}"
							>
								<!-- <GitHubLogoIcon class="mr-2 w-5 h-5" /> -->
								Github
							</a>
						</nav>
					</SheetContent>
				</Sheet>
			</span>

			<!-- desktop -->
			<nav class="hidden gap-2 md:flex">
				{#each routeList as { href, label }}
					<a
						rel="noreferrer noopener"
						{href}
						class="text-[17px] {buttonVariants({ variant: 'ghost' })}"
					>
						{label}
					</a>
				{/each}
			</nav>

			<div class="hidden gap-2 md:flex">
				<a
					rel="noreferrer noopener"
					href="https://github.com/leoMirandaa/shadcn-landing-page.git"
					target="_blank"
					class="border {buttonVariants({ variant: 'secondary' })}"
				>
					<!-- <GitHubLogoIcon class="mr-2 w-5 h-5" /> -->
					Github
				</a>

				<!-- <ModeToggle /> -->
			</div>
		</div>
	</nav>
</header>
