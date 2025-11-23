<script lang="ts">
	import {
		Sheet,
		SheetContent,
		SheetHeader,
		SheetTitle,
		SheetTrigger
	} from '$lib/components/ui/sheet';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Menu, Phone, Mail } from 'lucide-svelte';
	import logo from '../assets/logo.png';

	interface RouteProps {
		href: string;
		label: string;
	}

	const routeList: RouteProps[] = [
		{ href: '#about', label: 'Chi Siamo' },
		{ href: '#features', label: 'Servizi' },
		{ href: '#testimonials', label: 'Testimonianze' },
		{ href: '#faq', label: 'FAQ' }
	];

	let isOpen = false;
</script>

<header
	class="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-b-slate-700 dark:bg-background/95"
>
	<nav class="mx-auto">
		<div class="container flex h-16 items-center justify-between px-4">
			<!-- Logo -->
			<div class="flex items-center">
				<a rel="noreferrer noopener" href="/" class="flex items-center space-x-2">
					<img src={logo} alt="REI Logo" class="h-10 w-auto" />
				</a>
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden items-center gap-1 md:flex">
				{#each routeList as { href, label }}
					<a
						rel="noreferrer noopener"
						{href}
						class="text-sm font-medium transition-colors hover:text-primary {buttonVariants({
							variant: 'ghost'
						})}"
					>
						{label}
					</a>
				{/each}
			</nav>

			<!-- CTA Button (Desktop) -->
			<div class="hidden items-center gap-2 md:flex">
				<Button class="bg-gradient-to-r from-[#F596D3] to-[#D247BF] hover:opacity-90">
					<Phone class="mr-2 h-4 w-4" />
					Contattaci
				</Button>
			</div>

			<!-- Mobile Menu -->
			<div class="flex md:hidden">
				<Sheet bind:open={isOpen}>
					<SheetTrigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
						<Menu class="h-5 w-5">
							<span class="sr-only">Menu</span>
						</Menu>
					</SheetTrigger>

					<SheetContent side="right" class="w-[300px] sm:w-[400px]">
						<SheetHeader>
							<SheetTitle class="flex items-center gap-2 text-left">
								<img src={logo} alt="REI Logo" class="h-8 w-auto" />
								<span class="text-xl font-bold">
									<span
										class="bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent"
										>REI</span
									>
								</span>
							</SheetTitle>
						</SheetHeader>
						<nav class="mt-8 flex flex-col gap-4">
							{#each routeList as { href, label }}
								<a
									rel="noreferrer noopener"
									{href}
									on:click={() => (isOpen = false)}
									class="text-lg font-medium transition-colors hover:text-primary"
								>
									{label}
								</a>
							{/each}
							<div class="mt-4 space-y-3 border-t pt-4">
								<Button
									class="w-full bg-gradient-to-r from-[#F596D3] to-[#D247BF] hover:opacity-90"
								>
									<Phone class="mr-2 h-4 w-4" />
									Contattaci
								</Button>
								<Button variant="outline" class="w-full">
									<Mail class="mr-2 h-4 w-4" />
									Richiedi Valutazione
								</Button>
							</div>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	</nav>
</header>
