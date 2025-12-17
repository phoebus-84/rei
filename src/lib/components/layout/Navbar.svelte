<script lang="ts">
	import { currentUser, logout } from '$lib/stores/auth';
	import { getUserAvatarUrl } from '$lib/utils';
	import { Menu, X, Home, LogOut, User } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	let mobileMenuOpen = false;

	function handleLogout() {
		logout();
		mobileMenuOpen = false;
		goto('/');
	}

	$: user = $currentUser;
	$: userAvatar = user?.avatar ? getUserAvatarUrl(user.id, user.avatar) : null;
</script>

<nav class="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2 text-2xl font-bold text-gray-900">
				<Home size={28} class="text-blue-600" />
				<span>Paons Immobiliare</span>
			</a>

			<!-- Desktop Menu -->
			<div class="hidden items-center gap-1 md:flex">
				<a
					href="/properties"
					class="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
				>
					Properties
				</a>

				{#if user}
					<!-- User Menu -->
					<div class="ml-4 flex items-center gap-3 border-l border-gray-200 pl-4">
						{#if userAvatar}
							<img
								src={userAvatar}
								alt={user.name}
								class="h-8 w-8 rounded-full object-cover"
							/>
						{:else}
							<div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
								<User size={16} class="text-gray-600" />
							</div>
						{/if}

						<div class="flex flex-col">
							<span class="text-sm font-medium text-gray-900">{user.name}</span>
							<a
								href="/account"
								class="text-xs text-blue-600 hover:text-blue-700"
							>
								View Account
							</a>
						</div>

						<button
							on:click={handleLogout}
							class="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"
							aria-label="Sign out"
						>
							<LogOut size={18} />
						</button>
					</div>
				{:else}
					<!-- Auth Links -->
					<div class="ml-4 flex items-center gap-2 border-l border-gray-200 pl-4">
						<a
							href="/login"
							class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
						>
							Sign In
						</a>
						<a
							href="/register"
							class="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
						>
							Sign Up
						</a>
					</div>
				{/if}
			</div>

			<!-- Mobile Menu Button -->
			<button
				on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
				class="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100"
				aria-label="Toggle menu"
			>
				{#if mobileMenuOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="border-t border-gray-200 py-4 md:hidden">
				<div class="space-y-2">
					<a
						href="/properties"
						class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
						on:click={() => (mobileMenuOpen = false)}
					>
						Properties
					</a>

					{#if user}
						<div class="border-t border-gray-200 pt-4">
							<a
								href="/account"
								class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
								on:click={() => (mobileMenuOpen = false)}
							>
								My Account
							</a>
							<button
								on:click={handleLogout}
								class="w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
							>
								Sign Out
							</button>
						</div>
					{:else}
						<div class="border-t border-gray-200 pt-4 space-y-2">
							<a
								href="/login"
								class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
								on:click={() => (mobileMenuOpen = false)}
							>
								Sign In
							</a>
							<a
								href="/register"
								class="block rounded-lg bg-blue-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-600"
								on:click={() => (mobileMenuOpen = false)}
							>
								Sign Up
							</a>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</nav>
