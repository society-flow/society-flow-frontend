<script lang="javascript">
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
			],
			icon: `
			<svg class="admin-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
				<circle cx="20" cy="20" r="8" fill="#4CAF50" />
				<rect x="36" y="12" width="20" height="12" fill="#FFC107" rx="2" />
				<path d="M36 18 h20" stroke="#fff" stroke-width="2" />
				<circle cx="50" cy="40" r="6" fill="#757575" />
				<path d="M50 34 v12" stroke="#fff" stroke-width="2" />
			</svg>
		`
		},
		{
			title: 'Society Members',
			reasons: [
				'View all your residences across various societies and cities',
				'View your monthly dues with proper breakup of costs and available funds',
				'Message admins of issues being faced or get notifications from them.'
			],
			icon: `
			<svg class="member-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 32 L32 12 L52 32 V52 H12 Z" fill="#FFEB3B" />
				<circle cx="32" cy="40" r="6" fill="#2196F3" />
				<rect x="42" y="20" width="12" height="8" fill="#03A9F4" rx="1" />
				<path d="M42 20 L48 26 L54 20" fill="none" stroke="#fff" stroke-width="2" />
			</svg>
		`
		},
		{
			title: 'Looking for Rents or looking to buy one?',
			reasons: [
				'Check out the adverts published by authenticated valid landlords or societies about availability, as suitable to your budget and dream location'
			],
			icon: `
			<svg class="rent-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
				<path d="M32 8 A12 12 0 1 1 20 20 L32 56 L44 20 A12 12 0 1 1 32 8 Z" fill="#F44336" />
				<rect x="24" y="28" width="16" height="10" fill="#FF9800" />
				<circle cx="48" cy="48" r="5" fill="#607D8B" />
				<line x1="52" y1="52" x2="58" y2="58" stroke="#607D8B" stroke-width="2" />
			</svg>
		`
		}
	];
</script>

<svelte:head>
	<title>{$_('title')}</title>
</svelte:head>

<header>
	<h1>{$_('title')}</h1>
	{#if !userState?.isAuth}
		<center>
			<a href="{base}/auth/register">
				<HomeLogo />
			</a>
		</center>
	{/if}
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
							{@html marketingUserType.icon}
							<h2>{marketingUserType.title}</h2>
						</header>
						<main>
							<ul>
								{#each marketingUserType.reasons as reason}
									<li>{reason}</li>
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
		padding: calc(var(--s) * 2);
		background-color: var(--c-bg--secondary);
		border: 1px solid var(--c-border);
		border-radius: var(--border-radius);
		ul {
			list-style-type: square;
			padding: calc(var(--s) * 2);
		}
		@media (min-width: 50rem) {
			&:nth-of-type(2n) {
				transform: scale(1.1);
			}
		}
	}

	/* SVG shared settings */
	svg {
		max-width: calc(var(--s * 6));
		max-height: calc(var(--s * 6));
		transition: all 0.3s ease;
	}

	/* Admin icon - bounce and spin gear */
	.admin-icon:hover circle:first-of-type {
		animation: bounce 0.6s ease;
	}
	.admin-icon:hover circle:last-of-type {
		transform: rotate(20deg);
	}

	/* Member icon - glow and pulse box */
	.member-icon:hover path:first-of-type {
		filter: drop-shadow(0 0 var(--s) var(--c-link));
	}
	.member-icon:hover rect {
		animation: pulseBox 1s infinite;
	}

	/* Rent icon - pulse + scale magnifier */
	.rent-icon:hover path {
		animation: pop 0.4s ease;
	}
	.rent-icon:hover circle,
	.rent-icon:hover line {
		transform: scale(1.2);
		transform-origin: center;
	}

	/* Animations */
	@keyframes bounce {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-5px);
		}
		100% {
			transform: translateY(0);
		}
	}

	@keyframes pulseBox {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}

	@keyframes pop {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
