import PocketBase from 'pocketbase';

import { env } from '$env/dynamic/private';

function resolvePocketBaseUrl() {
	const pbUrl = env.PB_URL || import.meta.env.VITE_PB_URL || process.env.VITE_PB_URL;

	if (!pbUrl) {
		return 'http://localhost:8090';
	}

	return pbUrl.replace(/\/+$/, '');
}

export async function createPocketBaseAdmin() {
	const adminEmail = env.PB_ADMIN_EMAIL;
	const adminPassword = env.PB_ADMIN_PASSWORD;
	const pbUrl = resolvePocketBaseUrl();

	if (!adminEmail || !adminPassword) {
		throw new Error('PocketBase admin credentials are missing');
	}

	const pb = new PocketBase(pbUrl);
	pb.autoCancellation(false);

	try {
		await pb.admins.authWithPassword(adminEmail, adminPassword);
	} catch (error) {
		const status =
			typeof error === 'object' && error !== null && 'status' in error ? error.status : null;

		if (status !== 404) {
			throw new Error(
				`PocketBase admin authentication failed for ${pbUrl}. Check PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD.`,
				{
					cause: error
				}
			);
		}

		try {
			await pb.collection('_superusers').authWithPassword(adminEmail, adminPassword);
		} catch (superuserError) {
			throw new Error(
				`PocketBase superuser authentication failed for ${pbUrl}. The configured PB_ADMIN_EMAIL must be a valid _superusers account on this instance.`,
				{
					cause: superuserError
				}
			);
		}
	}

	return pb;
}
