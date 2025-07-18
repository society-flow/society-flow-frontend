<script>
	import { _, locale } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import Icon from '$lib/components/icon.svelte';
	import ListResidences from '$lib/components/residences/list.svelte';
	import Page from '$lib/components/routes/page.svelte';
	import PercentageOwnership from '$lib/components/societies/percentage-ownership.svelte';

	requiresAuth(locale);

	let societies = $state([]);
	$effect(async () => {
		if (userState?.user?.id) {
			societies = await api.getUserSocieties(userState.user.id);
		}
	});

	let dicResidences = $state({});
	$effect(async () => {
		if (societies) {
			const promises = societies.map(({ id }) => api.getAllResidencesInSociety(id));
			const res = await Promise.all(promises);
			dicResidences = res.reduce((acc, residences) => {
				for (const r of residences) {
					if (!acc[r.societyId]) acc[r.societyId] = [];
					acc[r.societyId].push(r);
				}
				return acc;
			}, {});
		}
	});

	let dicUserResidences = $state({});
	$effect(async () => {
		if (societies) {
			const promises = societies.map(({ id }) =>
				api.getUserResidencesInSociety(id, userState.user.id)
			);
			const res = await Promise.all(promises);
			dicUserResidences = res.reduce((acc, residences) => {
				for (const r of residences) {
					if (!acc[r.societyId]) acc[r.societyId] = [];
					acc[r.societyId].push(r);
				}
				return acc;
			}, {});
		}
	});
</script>

<Page title={$_('menu.residences')}>
	{#snippet header()}
		<h1>
			{$_('menu.residences')}
		</h1>
	{/snippet}

	{#each societies as society}
		{@const residences = dicResidences[society.id]}
		{@const userResidences = dicUserResidences[society.id]}
		<section>
			<header>
				<h2>
					<Anchor href={`/societies/${society.id}`}>
						<Icon icon="business-alt">
							{society.name}
						</Icon>
					</Anchor>
				</h2>
				<nav>
					<ul>
						<li>
							<abbr>
								<PercentageOwnership residences={userResidences} icon={false} />
								{'/'}
								<PercentageOwnership {residences} warnTotal />
							</abbr>
						</li>
						<li>
							<Anchor
								href={`/create/residences/${society.id}`}
								title={$_('menu.create.residences')}
								isButton
							>
								<Icon icon="add" />
							</Anchor>
						</li>
					</ul>
				</nav>
			</header>
			<ListResidences {residences} />
		</section>
	{/each}
</Page>

<style>
	abbr {
		display: flex;
		align-items: center;
	}
</style>
