<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { Mail, Lock, Eye, EyeOff } from 'lucide-svelte';

	let email = '';
	let password = '';
	let showPassword = false;
	let error = '';
	let isLoading = false;

	async function handleLogin() {
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
			await pb.collection('users').authWithPassword(email, password);
			// Redirect to properties page on success
			goto('/immobili');
		} catch (err: any) {
			error = 'Credenziali non valide. Controlla email e password.';
			console.error('Login error:', err);
		} finally {
			isLoading = false;
		}
	}


</script>

<svelte:head>
	<title>Accedi | REI Immobiliare</title>
	<meta name="description" content="Accedi al tuo account REI Immobiliare" />
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<!-- Header -->
		<div class="text-center">
			<h2 class="text-3xl font-bold text-foreground">Bentornato</h2>
			<p class="mt-2 text-muted-foreground">Accedi al tuo account per continuare</p>
		</div>

		<!-- Login Form -->
		<form on:submit|preventDefault={handleLogin} class="mt-8 space-y-6">
			<div class="space-y-4">
				<!-- Email Field -->
				<div>
					<label for="email" class="block text-sm font-medium text-foreground">Email</label>
					<div class="relative mt-2">
						<Mail size={20} class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
						<input
							type="email"
							id="email"
							bind:value={email}

							placeholder="tu@esempio.com"
							class="w-full rounded-lg border border-border bg-card py-3 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
							disabled={isLoading}
						/>
					</div>
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="block text-sm font-medium text-foreground">Password</label>
					<div class="relative mt-2">
						<Lock size={20} class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
						<input
							type={showPassword ? 'text' : 'password'}
							id="password"
							bind:value={password}

							placeholder="••••••••"
							class="w-full rounded-lg border border-border bg-card py-3 pl-10 pr-12 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
							disabled={isLoading}
						/>
						<button
							type="button"
							on:click={() => (showPassword = !showPassword)}
							class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
							aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
						>
							{#if showPassword}
								<EyeOff size={20} />
							{:else}
								<Eye size={20} />
							{/if}
						</button>
					</div>
				</div>
			</div>

			<!-- Error Message -->
			{#if error}
				<div class="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
					{error}
				</div>
			{/if}

			<!-- Submit Button -->
			<button
				type="submit"
				disabled={isLoading}
				class="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
			>
				{isLoading ? 'Accesso in corso...' : 'Accedi'}
			</button>
		</form>

		<!-- Footer -->
		<p class="text-center text-muted-foreground">
			Non hai un account?
			<a href="/register" class="font-medium text-primary hover:text-primary/80">Registrati</a>
		</p>
	</div>
</main>
