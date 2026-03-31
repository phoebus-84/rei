<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { Building2, MessageSquare, LayoutDashboard, LogOut, Menu, X } from 'lucide-svelte';

	let { children } = $props();
	let checked = $state(false);
	let sidebarOpen = $state(false);

	const isLoginPage = $derived(page.url.pathname === '/admin/login');

	function isAuthorized(): boolean {
		const model = pb.authStore.model as Record<string, any> | null;
		return (
			pb.authStore.isValid &&
			(model?.type === 'admin' || model?.type === 'agent')
		);
	}

	onMount(() => {
		if (!isLoginPage && !isAuthorized()) {
			goto('/admin/login', { replaceState: true });
		} else {
			checked = true;
		}
	});

	function logout() {
		pb.authStore.clear();
		goto('/admin/login');
	}

	const navItems = [
		{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
		{ href: '/admin/immobili', label: 'Immobili', icon: Building2, exact: false },
		{ href: '/admin/richieste', label: 'Richieste', icon: MessageSquare, exact: false }
	];

	function isActive(href: string, exact: boolean): boolean {
		if (exact) return page.url.pathname === href;
		return page.url.pathname.startsWith(href);
	}
</script>

{#if isLoginPage}
	{@render children()}
{:else if checked}
	<div class="flex min-h-screen bg-muted/30">
		<!-- Mobile overlay -->
		{#if sidebarOpen}
			<button
				class="fixed inset-0 z-40 cursor-default bg-black/50 lg:hidden"
				onclick={() => (sidebarOpen = false)}
				tabindex="-1"
				aria-label="Chiudi menu"
			></button>
		{/if}

		<!-- Sidebar -->
		<aside
			class="fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-background transition-transform lg:relative lg:translate-x-0 {sidebarOpen
				? 'translate-x-0'
				: '-translate-x-full'}"
		>
			<div class="flex h-full flex-col">
				<div class="flex items-center justify-between border-b p-6">
					<h1 class="font-display text-xl font-bold text-primary">REI Admin</h1>
					<button
						class="lg:hidden"
						onclick={() => (sidebarOpen = false)}
						aria-label="Chiudi menu"
					>
						<X class="h-5 w-5" />
					</button>
				</div>

				<nav class="flex-1 space-y-1 p-4">
					{#each navItems as item}
						{@const Icon = item.icon}
						<a
							href={item.href}
							class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors {isActive(
								item.href,
								item.exact
							)
								? 'bg-primary text-primary-foreground'
								: 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
							onclick={() => (sidebarOpen = false)}
						>
							<Icon class="h-4 w-4" />
							{item.label}
						</a>
					{/each}
				</nav>

				<div class="border-t p-4">
					<div class="mb-3 truncate px-3 text-xs text-muted-foreground">
						{(pb.authStore.model as Record<string, any> | null)?.email ?? ''}
					</div>
					<button
						onclick={logout}
						class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
					>
						<LogOut class="h-4 w-4" />
						Esci
					</button>
				</div>
			</div>
		</aside>

		<!-- Main content area -->
		<div class="flex flex-1 flex-col">
			<!-- Mobile header -->
			<header class="flex items-center border-b bg-background p-4 lg:hidden">
				<button onclick={() => (sidebarOpen = true)} aria-label="Apri menu">
					<Menu class="h-6 w-6" />
				</button>
				<span class="ml-4 font-display text-lg font-bold text-primary">REI Admin</span>
			</header>

			<main class="flex-1 overflow-auto p-6 lg:p-8">
				{@render children()}
			</main>
		</div>
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center">
		<div
			class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
		></div>
	</div>
{/if}
