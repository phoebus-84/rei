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
		{ value: 'customer', label: 'Looking to Buy/Rent' },
		{ value: 'agent', label: 'Real Estate Agent' }
	];

	function validateForm(): boolean {
		if (!formData.name.trim()) {
			error = 'Name is required';
			return false;
		}
		if (!formData.email.trim()) {
			error = 'Email is required';
			return false;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			error = 'Please enter a valid email';
			return false;
		}
		if (!formData.password) {
			error = 'Password is required';
			return false;
		}
		if (formData.password.length < 6) {
			error = 'Password must be at least 6 characters';
			return false;
		}
		if (formData.password !== formData.passwordConfirm) {
			error = 'Passwords do not match';
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
			goto('/properties');
		} catch (err: any) {
			error = err.message || 'Failed to create account. Please try again.';
			console.error('Registration error:', err);
		} finally {
			isLoading = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleRegister();
		}
	}
</script>

<svelte:head>
	<title>Sign Up | Paons Immobiliare</title>
	<meta name="description" content="Create a new Paons Immobiliare account" />
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<!-- Header -->
		<div class="text-center">
			<h2 class="text-3xl font-bold text-gray-900">Create Account</h2>
			<p class="mt-2 text-gray-600">Join us to explore amazing properties</p>
		</div>

		<!-- Registration Form -->
		<form on:submit|preventDefault={handleRegister} class="mt-8 space-y-6">
			<div class="space-y-4">
				<!-- Name Field -->
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
					<div class="relative mt-2">
						<User size={20} class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							on:keydown={handleKeydown}
							placeholder="John Doe"
							class="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							disabled={isLoading}
						/>
					</div>
				</div>

				<!-- Email Field -->
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
					<div class="relative mt-2">
						<Mail size={20} class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
						<input
							type="email"
							id="email"
							bind:value={formData.email}
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
							bind:value={formData.password}
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

				<!-- Confirm Password Field -->
				<div>
					<label for="passwordConfirm" class="block text-sm font-medium text-gray-700">
						Confirm Password
					</label>
					<div class="relative mt-2">
						<Lock size={20} class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
						<input
							type={showPasswordConfirm ? 'text' : 'password'}
							id="passwordConfirm"
							bind:value={formData.passwordConfirm}
							on:keydown={handleKeydown}
							placeholder="••••••••"
							class="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-12 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							disabled={isLoading}
						/>
						<button
							type="button"
							on:click={() => (showPasswordConfirm = !showPasswordConfirm)}
							class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							aria-label={showPasswordConfirm ? 'Hide password' : 'Show password'}
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
					<label class="block text-sm font-medium text-gray-700 mb-3">Account Type</label>
					<div class="space-y-2">
						{#each userTypes as type (type.value)}
							<label class="flex items-center gap-3 cursor-pointer">
								<input
									type="radio"
									bind:group={formData.type}
									value={type.value}
									class="h-4 w-4 border-gray-300 text-blue-500"
									disabled={isLoading}
								/>
								<span class="text-sm text-gray-700">{type.label}</span>
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
				class="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-50"
			>
				{isLoading ? 'Creating Account...' : 'Create Account'}
			</button>
		</form>

		<!-- Footer -->
		<p class="text-center text-gray-600">
			Already have an account?
			<a href="/login" class="font-medium text-blue-500 hover:text-blue-600">Sign in</a>
		</p>
	</div>
</main>
