<script>
	import { _, locale } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Map from '$lib/components/map.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import Error from '$lib/components/error.svelte';
	import SocietyDetails from '$lib/components/societies/details.svelte';
	import SocietyJoin from '$lib/components/societies/join.svelte';
	import FundCard from '$lib/components/funds/card.svelte';

	requiresAuth(locale);

	const { data } = $props();
	const { society, userRole, isAdmin, fund } = $derived(data);
	const id = society.id;

	const markers = $derived(
		society?.geoCoordinate
			? [
					{
						coordinates: [society.geoCoordinate.x, society.geoCoordinate.y],
						title: society.name || society.id
					}
				]
			: []
	);
</script>

{#if markers.length}
	<aside>
		<Map {markers} />
	</aside>
{/if}

{#if isAdmin}
	<aside>
		<nav>
			<ul>
				<li>
					<Anchor href={`/update/societies/${id}`} title={$_('menu.update.societies')} isButton>
						{$_('menu.update.societies')}
					</Anchor>
				</li>
				<li>
					<Anchor href={`/delete/societies/${id}`} title={$_('common.delete')} isButton>
						{$_('common.delete')}
					</Anchor>
				</li>
			</ul>
		</nav>
	</aside>
{/if}

<SocietyDetails {society} {userRole} />

<FundCard total={fund.totalFund} currency={society.currency}/>