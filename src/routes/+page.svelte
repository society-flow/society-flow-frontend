<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import { api } from '$lib/api.svelte.js';
	import ListSocieties from '$lib/components/societies/list.svelte';
	import ListResidences from '$lib/components/residences/list.svelte';
	import HomeLogo from '$lib/components/home-logo.svelte';
	import SvgIcon from '$lib/components/svg-icon.svelte';

	let societies = $state([]);
	$effect(async () => {
		societies = await api.getSocieties();
	});

	let residences = $state([]);
	$effect(async () => {
		residences = await api.getResidences();
	});

	// Now: icon is just a string identifier (no raw HTML)
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
			],
			icon: 'admin'
		},
		{
			title: 'Society Members',
			reasons: [
				'View all your residences across various societies and cities',
				'View your monthly dues with proper breakup of costs and available funds',
				'Message admins of issues being faced or get notifications from them.'
			],
			icon: 'member'
		},
		{
			title: 'Looking for Rents or looking to buy one?',
			reasons: [
				'Check out the adverts published by authenticated valid landlords or societies about availability, as suitable to your budget and dream location'
			],
			icon: 'rent'
		}
	];
</script>

<svelte:head>
	<title>{$_('title')}</title>
</svelte:head>

<header>
	<h1>{$_('title')}</h1>
	<p>{$_('catch_line')}</p>
	<center>
		<a href="{base}/auth/register">
			<HomeLogo />
		</a>
	</center>
</header>

{#if userState.isAuth}
	<section>
		<article>
			<p>
				Hello <strong>{userState?.user?.name}</strong> (
				{userState?.user?.email}).
			</p>
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
									<li>{reason}</li>
								{/each}
							</ul>
						</main>
						<aside>
							<SvgIcon name={marketingUserType.icon} />
						</aside>
					</article>
				</li>
			{/each}
		</ul>
	</section>

	<section>
		{#if !userState?.isAuth}
			<center>
				<p>
					Join {$_('title')} and discover all features.
				</p>
			</center>
		{/if}
		<center>
			<a href="{base}/auth/login">{$_('menu.login')}</a>
		</center>
	</section>
{/if}

<style>
	section {
		margin: calc(var(--s) * 3) 0;
		:global(.Site-main) > & {
			max-width: calc(var(--s-container) * 1.4);
		}
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
		gap: calc(var(--s) * 4);
		@media (min-width: 50rem) {
			gap: calc(var(--s) * 6);
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	.Card {
		/* keeps the same sizing as before */
		--s-svg: calc(var(--s) * 15);
		padding: calc(var(--s) * 2);
		background-color: var(--c-bg--secondary);
		border: 1px solid var(--c-border);
		border-radius: var(--border-radius);

		ul {
			list-style-type: square;
			padding: calc(var(--s) * 2);
		}

		:global(svg) {
			max-width: var(--s-svg);
			max-height: var(--s-svg);
			transition: all 0.3s ease;
			border: 1px solid var(--c-bg);
			margin: calc(var(--s) * 2) auto;
			display: block;
			background-color: var(--c-bg);
			border-radius: var(--border-radius);
			padding: var(--s);
		}
		:global(header) {
			text-align: center;
			order: 1;
		}
		:global(main) {
			order: 0;
		}

		@media (min-width: 50rem) {
			&:nth-of-type(2n) {
				transform: scale(1.1);
			}
		}
	}
</style>
