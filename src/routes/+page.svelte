<script>
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';

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

<h1>{$_('title')}</h1>

<ul>
	{#each marketingUserTypes as marketingUserType}
		<li>
			<article>
				<header>
					{marketingUserType.title}
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

<p>
	<a href="{base}login">
		{$_('menu.login')}
	</a>
</p>
