<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { api } from '$lib/api.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import ListAds from '$lib/components/ads/list.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	const typeId = $derived(page.url.searchParams.get('type'));

	let adverts = $state([]);
	$effect(async () => {
		if (typeId) {
			adverts = await api.getAllAdvertisements({ typeId, isActive: true });
		} else {
			adverts = await api.getAllAdvertisements({
				isActive: true
			});
		}
	});

	let adTypeOptions = $state([]);
	$effect(async () => {
		if (adTypeOptions.length === 0) {
			adTypeOptions = await api.getAllAdTypes();
		}
	});
</script>

<Page title={$_('menu.ads')}>
	<details>
		<summary>
			{$_('components.ads.form.type')}
		</summary>
		<nav>
			{#each adTypeOptions as option}
				<Anchor
					href={`/ads?type=${option.id}`}
					isButton
					aria-current={option.id === typeId ? 'page' : ''}
					>{$_(`const.ads_types.${option.name}`)}</Anchor
				>
			{/each}
		</nav>
	</details>

	<section>
		<ListAds ads={adverts} />
	</section>
</Page>
