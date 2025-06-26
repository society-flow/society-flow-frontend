<script>
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { api } from '$lib/api.svelte.js';
	import ListAds from '$lib/components/ads/list.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	let typeId = $derived(page.url.searchParams.get('type'));
	const { data } = $props();
	const { adTypes } = $derived(data);

	const selectedType = $derived(adTypes.find(({ id }) => id === typeId));

	let ads = $state([]);
	$effect(async () => {
		if (typeId) {
			ads = await api.getAllAdvertisements({ typeId, isActive: true });
		} else {
			ads = await api.getAllAdvertisements({
				isActive: true
			});
		}
	});
</script>

<details>
	<summary>
		{$_('components.ads.form.type')}
		{#if selectedType}
			({$_(`const.ads_types.${selectedType.name}`)})
		{/if}
	</summary>
	<nav>
		{#each adTypes as option}
			<Anchor href={`/ads?type=${option.id}`} isActive={option.id === typeId}
				>{$_(`const.ads_types.${option.name}`)}</Anchor
			>
		{/each}
	</nav>
</details>

<section>
	<ListAds {ads} />
</section>
