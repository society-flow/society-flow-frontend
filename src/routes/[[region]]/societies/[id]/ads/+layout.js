import { api, initApi } from '$lib/api.svelte.js';

export const prerender = false;

export async function load({ params, depends }) {
  depends('data:society-adverts');

  const { id } = params;
  await initApi();
  const adverts = await api.getAdvertisementsBySocietyId(id);

  return { adverts };
}
