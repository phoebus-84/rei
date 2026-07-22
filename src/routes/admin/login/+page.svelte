<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { Mail, Lock, Eye, EyeOff } from 'lucide-svelte';

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let error = $state('');
	let isLoading = $state(false);

	async function handleLogin(e: Event) {
		e.preventDefault();
		error = '';

		if (!email.trim()) {
			error = 'Inserisci la tua email';
			return;
		}
		if (!password) {
			error = 'Inserisci la password';
			return;
		}

		isLoading = true;

		try {
			const authData = await pb.collection('users').authWithPassword(email, password);
			const userType = (authData.record as Record<string, any> | undefined)?.type;

			if (userType !== 'admin' && userType !== 'agent') {
				pb.authStore.clear();
				error = 'Accesso riservato al personale autorizzato.';
				return;
			}

			goto('/admin');
		} catch (err: any) {
			error = 'Credenziali non valide. Controlla email e password.';
			console.error('Login error:', err);
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Login | REI Casa</title>
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-muted/30 px-4">
	<div class="w-full max-w-sm">
		<div class="mb-8 text-center">
			<h1 class="font-display text-2xl font-bold text-primary">REI Admin</h1>
			<p class="mt-2 text-sm text-muted-foreground">Accedi al pannello di gestione</p>
		</div>

		<form onsubmit={handleLogin} class="space-y-4 rounded-lg border bg-background p-6 shadow-sm">
			{#if error}
				<div class="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
					{error}
				</div>
			{/if}

			<div>
				<label for="email" class="block text-sm font-medium text-foreground">Email</label>
				<div class="relative mt-1">
					<Mail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<input
						id="email"
						type="email"
						bind:value={email}
						placeholder="email@esempio.it"
						class="h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
						autocomplete="email"
					/>
				</div>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-foreground">Password</label>
				<div class="relative mt-1">
					<Lock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<input
						id="password"
						type={showPassword ? 'text' : 'password'}
						bind:value={password}
						placeholder="••••••••"
						class="h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
						autocomplete="current-password"
					/>
					<button
						type="button"
						onclick={() => (showPassword = !showPassword)}
						class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					>
						{#if showPassword}
							<EyeOff class="h-4 w-4" />
						{:else}
							<Eye class="h-4 w-4" />
						{/if}
					</button>
				</div>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				class="h-10 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
			>
				{isLoading ? 'Accesso in corso...' : 'Accedi'}
			</button>
		</form>
	</div>
</main>
