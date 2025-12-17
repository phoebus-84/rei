import { writable } from 'svelte/store';
import { pb } from '$lib/pocketbase';
import type { RecordModel } from 'pocketbase';

// Create a writable store for the current user
export const currentUser = writable<RecordModel | null>(pb.authStore.model);

// Create a writable store for the auth state
export const authStore = writable(pb.authStore);

// Setup auth state listener
pb.authStore.onChange((token, model) => {
	currentUser.set(model);
	authStore.set(pb.authStore);
	console.log('Auth changed:', { token: !!token, model: model?.id });
});

// Helper to check if user is logged in
export function isLoggedIn(): boolean {
	return pb.authStore.isValid;
}

// Helper to get current user
export function getCurrentUser(): RecordModel | null {
	return pb.authStore.model;
}

// Helper to logout
export function logout(): void {
	pb.authStore.clear();
	currentUser.set(null);
}
