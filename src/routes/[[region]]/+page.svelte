<script lang="javascript">
	import { _, json, locale } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { getTicker, getTickers } from '$lib/db-static.js';
	import { userState } from '$lib/states/user.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import ListSocieties from '$lib/components/societies/list.svelte';
	import ListResidences from '$lib/components/residences/list.svelte';
	import ListAds from '$lib/components/ads/list.svelte';
	import MarketingUsers from '$lib/components/marketing/users.svelte';
	import HomeLogo from '$lib/components/home-logo.svelte';
	import SvgIcon from '$lib/components/svg-icon.svelte';

	let ticker = $state({});
	$effect(async () => {
		ticker = await getTicker('dev', $locale);
	});

	let societies = $state([]);
	$effect(async () => {
		if (userState?.isAuth) {
			societies = await api.getUserSocieties(userState.user.id);
		}
	});

	let residences = $state([]);
	$effect(async () => {
		if (userState?.isAuth && societies) {
			const promises = societies.map(({ id }) =>
				api.getUserResidencesInSociety(id, userState.user.id)
			);
			const res = await Promise.all(promises);
			residences = [].concat(...res);
		}
	});

	let ads = $state([]);
	$effect(async () => {
		if (userState?.isAuth) {
			ads = await api.getAdvertisementsByUserId(userState.user.id);
		}
	});

	const marketingUserTypes = $derived($json('pages.home.marketing.user_types'));
	const titleOneWord = $derived($_('title').split(' ').join(''));
</script>

<Page title={$_('title')} isWide={!userState?.isAuth} isCenter={!userState?.isAuth}>
	{#snippet header()}
		{#if !userState.isAuth}
			<h1>{titleOneWord}</h1>
			<p>{$_('catch_line')}</p>
			<center>
				<Anchor href="/auth/register" title={$_('menu.auth.register')}>
					<HomeLogo />
				</Anchor>
			</center>
		{/if}
	{/snippet}

	{#if userState.isAuth}
		<section>
			<header>
				<h2>{$_('pages.home.auth.dashboard.title')}</h2>
				<p>
					{$_('pages.home.auth.greeting', {
						values: { name: userState?.user?.name, email: userState?.user?.email }
					})}
				</p>
			</header>
		</section>
		<section>
			<h2>{$_('menu.societies')}</h2>
			{#if societies?.length}
				<ListSocieties {societies} />
			{:else}
				<Anchor href="/create/societies" isButton>
					{$_('menu.create.societies')}
				</Anchor>
			{/if}
		</section>
		<section>
			<h2>{$_('menu.residences')}</h2>
			{#if residences?.length}
				<ListResidences {residences} />
			{:else}
				<Anchor href="/create/residences" isButton>
					{$_('menu.create.residences')}
				</Anchor>
			{/if}
		</section>
		<section>
			<h2>{$_('menu.adverts')}</h2>
			{#if ads?.length}
				<ListAds {ads} />
			{:else}
				<Anchor href="/create/ads" isButton>
					{$_('menu.create.ads')}
				</Anchor>
			{/if}
		</section>
	{:else}
		<section>
			<MarketingUsers />
		</section>
	{/if}

	{#snippet footer()}
		{#if !userState.isAuth}
			<section>
				{#if !userState?.isAuth}
					<center>
						<p>
							{$_('pages.home.marketing.call_to_action', { values: { title: titleOneWord } })}
						</p>
					</center>
				{/if}
				<center>
					<Anchor href="/auth/login">{$_('menu.auth.login')}</Anchor>
				</center>
			</section>
			{#if ticker}
				<aside class="Ticker">
					<header>
						<h3 class="Ticker-title">
							{ticker?.title}
						</h3>
					</header>
					{#if ticker?.body}
						<main>
							{ticker.body}
						</main>
					{/if}
				</aside>
			{/if}
		{/if}
	{/snippet}
</Page>

<style>
	h1 {
		text-align: center;
	}
	.Ticker {
		background-color: var(--c-bg--secondary);
		padding: var(--s) calc(var(--s) * 2);
		border-radius: var(--border-radius);
		font-style: italic;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--s);
		.Ticker-title {
			margin-bottom: 0;
		}
	}
</style>
