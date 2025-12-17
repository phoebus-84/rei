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
			error = 'Email is required';
			return;
		}
		if (!password) {
			error = 'Password is required';
			return;
		}

		isLoading = true;

		try {
			await pb.collection('users').authWithPassword(email, password);
			// Redirect to properties page on success
			goto('/properties');
		} catch (err: any) {
			error = err.message || 'Failed to login. Please check your credentials.';
			console.error('Login error:', err);
		} finally {
			isLoading = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleLogin();
		}
	}
</script>

<svelte:head>
	<title>Login | Paons Immobiliare</title>
	<meta name="description" content="Login to your Paons Immobiliare account" />
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<!-- Header -->
		<div class="text-center">
			<h2 class="text-3xl font-bold text-gray-900">Welcome Back</h2>
			<p class="mt-2 text-gray-600">Sign in to your account to continue</p>
		</div>

		<!-- Login Form -->
		<form on:submit|preventDefault={handleLogin} class="mt-8 space-y-6">
			<div class="space-y-4">
				<!-- Email Field -->
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
					<div class="relative mt-2">
						<Mail size={20} class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
						<input
							type="email"
							id="email"
							bind:value={email}
							on:keydown={handleKeydown}
							placeholder="you@example.com"
							class="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							disabled={isLoading}
						/>
					</div>
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<div class="relative mt-2">
						<Lock size={20} class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
						<input
							type={showPassword ? 'text' : 'password'}
							id="password"
							bind:value={password}
							on:keydown={handleKeydown}
							placeholder="••••••••"
							class="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-12 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							disabled={isLoading}
						/>
						<button
							type="button"
							on:click={() => (showPassword = !showPassword)}
							class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							aria-label={showPassword ? 'Hide password' : 'Show password'}
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
				class="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-50"
			>
				{isLoading ? 'Signing in...' : 'Sign In'}
			</button>
		</form>

		<!-- Footer -->
		<p class="text-center text-gray-600">
			Don't have an account?
			<a href="/register" class="font-medium text-blue-500 hover:text-blue-600">Sign up</a>
		</p>
	</div>
</main>
