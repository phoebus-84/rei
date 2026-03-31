<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { User, Mail, Lock, Eye, EyeOff, UserCheck } from 'lucide-svelte';

	let formData = {
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
		type: 'customer'
	};

	let showPassword = false;
	let showPasswordConfirm = false;
	let error = '';
	let isLoading = false;

	const userTypes = [
		{ value: 'customer', label: 'Cerco casa / Affitto' },
		{ value: 'agent', label: 'Agente Immobiliare' }
	];

	function validateForm(): boolean {
		if (!formData.name.trim()) {
			error = 'Inserisci il tuo nome';
			return false;
		}
		if (!formData.email.trim()) {
			error = 'Inserisci la tua email';
			return false;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			error = 'Inserisci un indirizzo email valido';
			return false;
		}
		if (!formData.password) {
			error = 'Inserisci una password';
			return false;
		}
		if (formData.password.length < 6) {
			error = 'La password deve avere almeno 6 caratteri';
			return false;
		}
		if (formData.password !== formData.passwordConfirm) {
			error = 'Le password non corrispondono';
			return false;
		}
		return true;
	}

	async function handleRegister() {
		error = '';

		if (!validateForm()) {
			return;
		}

		isLoading = true;

		try {
			// Create user account
			const userData = {
				email: formData.email,
				password: formData.password,
				passwordConfirm: formData.passwordConfirm,
				name: formData.name,
				type: formData.type
			};

			const newRecord = await pb.collection('users').create(userData);

			// Authenticate the user
			await pb.collection('users').authWithPassword(formData.email, formData.password);

			// Redirect to properties page
			goto('/immobili');
		} catch (err: any) {
			error = 'Registrazione non riuscita. Riprova.';
			console.error('Registration error:', err);
		} finally {
			isLoading = false;
		}
	}


</script>

<svelte:head>
	<title>Registrati | REI Immobiliare</title>
	<meta name="description" content="Crea un account REI Immobiliare" />
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<!-- Header -->
		<div class="text-center">
			<h2 class="text-3xl font-bold text-foreground">Crea Account</h2>
			<p class="mt-2 text-muted-foreground">Registrati per esplorare i nostri immobili</p>
		</div>

		<!-- Registration Form -->
		<form on:submit|preventDefault={handleRegister} class="mt-8 space-y-6">
			<div class="space-y-4">
				<!-- Name Field -->
				<div>
					<label for="name" class="block text-sm font-medium text-foreground">Nome Completo</label>
					<div class="relative mt-2">
						<User size={20} class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
						<input
							type="text"
							id="name"
							bind:value={formData.name}

							placeholder="Mario Rossi"
							class="w-full rounded-lg border border-border bg-card py-3 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
							disabled={isLoading}
						/>
					</div>
				</div>

				<!-- Email Field -->
				<div>
					<label for="email" class="block text-sm font-medium text-foreground">Email</label>
					<div class="relative mt-2">
						<Mail size={20} class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
						<input
							type="email"
							id="email"
							bind:value={formData.email}

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
							bind:value={formData.password}

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

				<!-- Confirm Password Field -->
				<div>
					<label for="passwordConfirm" class="block text-sm font-medium text-foreground">
						Conferma Password
					</label>
					<div class="relative mt-2">
						<Lock size={20} class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
						<input
							type={showPasswordConfirm ? 'text' : 'password'}
							id="passwordConfirm"
							bind:value={formData.passwordConfirm}

							placeholder="••••••••"
							class="w-full rounded-lg border border-border bg-card py-3 pl-10 pr-12 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
							disabled={isLoading}
						/>
						<button
							type="button"
							on:click={() => (showPasswordConfirm = !showPasswordConfirm)}
							class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
							aria-label={showPasswordConfirm ? 'Nascondi password' : 'Mostra password'}
						>
							{#if showPasswordConfirm}
								<EyeOff size={20} />
							{:else}
								<Eye size={20} />
							{/if}
						</button>
					</div>
				</div>

				<!-- User Type Selection -->
				<div>
					<label class="block text-sm font-medium text-foreground mb-3">Tipo Account</label>
					<div class="space-y-2">
						{#each userTypes as type (type.value)}
							<label class="flex items-center gap-3 cursor-pointer">
								<input
									type="radio"
									bind:group={formData.type}
									value={type.value}
									class="h-4 w-4 border-border text-primary"
									disabled={isLoading}
								/>
								<span class="text-sm text-foreground">{type.label}</span>
							</label>
						{/each}
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
				{isLoading ? 'Creazione account...' : 'Crea Account'}
			</button>
		</form>

		<!-- Footer -->
		<p class="text-center text-muted-foreground">
			Hai già un account?
			<a href="/login" class="font-medium text-primary hover:text-primary/80">Accedi</a>
		</p>
	</div>
</main>
