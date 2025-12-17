<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { getUserAvatarUrl } from '$lib/utils';
	import { Phone, MessageCircle, Check } from 'lucide-svelte';
	import type { RecordModel } from 'pocketbase';

	export let property: RecordModel;
	export let agent: RecordModel | null;

	let isSubmitting = false;
	let isSuccess = false;
	let error = '';

	// Form state
	let formData = {
		customer_name: '',
		customer_email: '',
		customer_phone: '',
		message: ''
	};

	function validateEmail(email: string): boolean {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	}

	function validatePhone(phone: string): boolean {
		// Allow common phone formats
		const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
		return re.test(phone.replace(/\s/g, ''));
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';

		// Validation
		if (!formData.customer_name.trim()) {
			error = 'Name is required';
			return;
		}
		if (!formData.customer_email.trim()) {
			error = 'Email is required';
			return;
		}
		if (!validateEmail(formData.customer_email)) {
			error = 'Please enter a valid email';
			return;
		}
		if (!formData.customer_phone.trim()) {
			error = 'Phone is required';
			return;
		}
		if (!validatePhone(formData.customer_phone)) {
			error = 'Please enter a valid phone number';
			return;
		}

		isSubmitting = true;

		try {
			await pb.collection('inquiries').create({
				property: property.id,
				customer_name: formData.customer_name,
				customer_email: formData.customer_email,
				customer_phone: formData.customer_phone,
				message: formData.message,
				status: 'new'
			});

			isSuccess = true;

			// Reset after 3 seconds
			setTimeout(() => {
				isSuccess = false;
				formData = {
					customer_name: '',
					customer_email: '',
					customer_phone: '',
					message: ''
				};
			}, 3000);
		} catch (err) {
			error = 'Failed to send inquiry. Please try again.';
			console.error('Inquiry submission error:', err);
		} finally {
			isSubmitting = false;
		}
	}

	function handleWhatsApp() {
		const message = `Hi, I'm interested in the property: ${property.title}`;
		const encoded = encodeURIComponent(message);
		const phone = agent?.phone?.replace(/\D/g, '') || '';
		if (phone) {
			window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
		}
	}

	function handleCall() {
		const phone = agent?.phone;
		if (phone) {
			window.location.href = `tel:${phone}`;
		}
	}

	const agentAvatar = agent?.avatar ? getUserAvatarUrl(agent.id, agent.avatar) : null;
</script>

<div class="sticky top-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
	{#if isSuccess}
		<!-- Success State -->
		<div class="space-y-4 text-center">
			<div class="flex justify-center">
				<div class="rounded-full bg-green-100 p-3">
					<Check size={32} class="text-green-600" />
				</div>
			</div>
			<h3 class="text-lg font-semibold text-gray-900">Message Sent!</h3>
			<p class="text-sm text-gray-600">
				Thank you for your inquiry. The agent will contact you shortly.
			</p>
		</div>
	{:else}
		<!-- Agent Header -->
		{#if agent}
			<div class="mb-6 flex items-start gap-4 pb-6 border-b border-gray-200">
				{#if agentAvatar}
					<img
						src={agentAvatar}
						alt={agent.name}
						class="h-12 w-12 rounded-full object-cover"
					/>
				{:else}
					<div class="h-12 w-12 rounded-full bg-gray-300" />
				{/if}
				<div class="flex-1">
					<h3 class="font-semibold text-gray-900">{agent.name}</h3>
					<p class="text-sm text-gray-600">Agent</p>
				</div>
			</div>
		{/if}

		<!-- Contact Form -->
		<form on:submit={handleSubmit} class="space-y-4">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
				<input
					type="text"
					id="name"
					bind:value={formData.customer_name}
					placeholder="Your name"
					class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
				/>
			</div>

			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					id="email"
					bind:value={formData.customer_email}
					placeholder="your@email.com"
					class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
				/>
			</div>

			<div>
				<label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
				<input
					type="tel"
					id="phone"
					bind:value={formData.customer_phone}
					placeholder="+353 123 456 7890"
					class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
				/>
			</div>

			<div>
				<label for="message" class="block text-sm font-medium text-gray-700">Message</label>
				<textarea
					id="message"
					bind:value={formData.message}
					placeholder="Tell us about your interest..."
					rows={4}
					class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
				/>
			</div>

			{#if error}
				<div class="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
					{error}
				</div>
			{/if}

			<button
				type="submit"
				disabled={isSubmitting}
				class="w-full rounded-lg bg-blue-500 py-2.5 font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-50"
			>
				{isSubmitting ? 'Sending...' : 'Send Message'}
			</button>
		</form>

		<!-- Quick Actions -->
		{#if agent?.phone}
			<div class="mt-6 space-y-3 border-t border-gray-200 pt-6">
				<button
					on:click={handleCall}
					class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 font-medium text-gray-700 transition-all hover:bg-gray-50"
				>
					<Phone size={18} />
					Call Agent
				</button>
				<button
					on:click={handleWhatsApp}
					class="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-2.5 font-medium text-white transition-all hover:bg-green-600"
				>
					<MessageCircle size={18} />
					WhatsApp
				</button>
			</div>
		{/if}
	{/if}
</div>
