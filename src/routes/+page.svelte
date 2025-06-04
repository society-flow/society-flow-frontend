<script>
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import { api } from '$lib/api.svelte.js';
	import ListSocieties from '$lib/components/societies/list.svelte';
	import ListResidences from '$lib/components/residences/list.svelte';
	import HomeLogo from '$lib/components/home-logo.svelte';

	let societies = $state([]);
	$effect(async () => {
		societies = await api.getSocieties();
	});

	let residences = $state([]);
	$effect(async () => {
		residences = await api.getResidences();
	});

	const marketingUserTypes = [
		{
			title: 'Society Admins',
			reasons: [
				'Create one or more society',
				'Invite users',
				'Add expenses needed',
				'Approve payment records',
				'Create custom adjustments',
				'Publish notices to residents'
			]
		},
		{
			title: 'Society Members',
			reasons: [
				'View all your residences across various societies and cities',
				'View your monthly dues with proper breakup of costs and available funds',
				'Message admins of issues being faced or get notifications from them.'
			]
		},
		{
			title: 'Looking for Rents or looking to buy one?',
			reasons: [
				'Check out the adverts published by authenticated valid landlords or societies about availability, as suitable to your budget and dream location'
			]
		}
	];
</script>

<svelte:head>
	<title>{$_('title')}</title>
</svelte:head>

<header>
	<h1>{$_('title')}</h1>
	<p>{$_('catch_line')}</p>
</header>

{#if userState.isAuth}
	<section>
		<article>
			<p>Hello <strong>{userState?.user?.name}</strong> ({userState?.user?.email}).</p>
		</article>
	</section>
	<section>
		<header>
			<h2>Your Dashboard</h2>
			<p>Here is a summary of your information.</p>
		</header>
		<article>
			<h2>Messages</h2>
			<p>No new messages in your inbox.</p>
		</article>
		<article>
			{#if societies?.length}
				<h2>Societies</h2>
				<ListSocieties {societies} />
			{/if}
		</article>
		<article>
			{#if residences?.length}
				<h2>Residences</h2>
				<ListResidences {residences} />
			{/if}
		</article>
	</section>
{:else}
	<section>
		<ul class="Cards">
			{#each marketingUserTypes as marketingUserType}
				<li class="Card">
					<article>
						<header>
							<h2>{marketingUserType.title}</h2>
						</header>
						<main>
							<ul>
								{#each marketingUserType.reasons as reason}
									<li>
										{reason}
									</li>
								{/each}
							</ul>
						</main>
					</article>
				</li>
			{/each}
		</ul>
	</section>
	<section>
		<center>
			<a href="{base}/auth/login">
				{$_('menu.login')}
			</a>
		</center>
	</section>
	<section>
		<center>
			<a href="{base}/auth/register">
				<HomeLogo />
			</a>
		</center>
	</section>
{/if}

<style>
	section {
		margin-bottom: calc(var(--s) * 3);
	}
	article {
		margin-bottom: calc(var(--s) * 2);
	}
	h1 {
		text-align: center;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.Cards {
		display: grid;
		justify-content: center;
		@media (min-width: 50rem) {
			grid-template-columns: 1fr 1fr 1fr;
		}
		gap: calc(var(--s) * 2);
	}
	.Card {
		padding: calc(var(--s) * 2);
		background-color: var(--c-bg--secondary);
		border-radius: var(--border-radius);
		ul {
			list-style-type: square;
			padding: calc(var(--s) * 2);
		}
	}
</style>
