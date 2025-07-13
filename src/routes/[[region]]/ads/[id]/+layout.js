import { api, initApi } from '$lib/api.svelte.js';
import { userState } from '$lib/states/user.svelte.js';

export const prerender = false;

export async function load({ params }) {
	await initApi();
	const { id } = params;
	let advert, residency, society;

	if (id) {
		advert = await api.getAdvertisementById(id);

		if (advert?.societyId || advert?.residencyId) {
			try {
				if (advert.residencyId) {
					residency = await api.getResidenceById(advert.residencyId);
					society = null; // Clear society if residency is found
				} else if (advert.societyId) {
					society = await api.getSocietyById(advert.societyId);
					residency = null; // Clear residency if society is found
				}
			} catch (error) {
				console.error('Error fetching location data:', error);
			}
		}

		// Compute ownership and admin status on the client
		const user = userState.user;
		const isOwner = !!(user && advert.userId === user.id);
		const isAdmin = !!(user && user.role === 'ADMIN');
		return { advert, residency, society, isOwner, isAdmin };
	}
}
