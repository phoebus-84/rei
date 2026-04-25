import PocketBase from 'pocketbase';

import { env } from '$env/dynamic/private';

const pbUrl = process.env.VITE_PB_URL || 'http://localhost:8090';

export async function createPocketBaseAdmin() {
	const adminEmail = env.PB_ADMIN_EMAIL;
	const adminPassword = env.PB_ADMIN_PASSWORD;

	if (!adminEmail || !adminPassword) {
		throw new Error('PocketBase admin credentials are missing');
	}

	const pb = new PocketBase(pbUrl);
	pb.autoCancellation(false);

	await pb.admins.authWithPassword(adminEmail, adminPassword);

	return pb;
}
