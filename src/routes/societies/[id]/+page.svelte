<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	$: id = $page.params.id;

	const data = {
		member: {
			name: 'Vivian Richard',
			society: 'Reichenbergerstr.21',
			role: 'Member'
		},
		society_details: {
			society_fund_eur: 5098,
			locale: 'DE',
			total_active_residences: 12,
			jurisdiction: 'DE',
			total_active_residents: 25,
			time_zone: 'berlin/Europe',
			area_unit: 'Meter square',
			currency_code: 'EUR'
		},
		wall_posts_from_admin: [
			{
				date: '2025-05-31T09:30:00Z',
				message:
					'We contacted with new house cleaning service Agatha Agency. Received quotation of 450 Eur Per month. Will replace the current cleaning service from 1st July 2025.'
			},
			{
				date: '2025-02-19T15:21:00Z',
				message: 'We are at deficit due to lack of regular payments from flats 3 and 7.'
			}
		],
		posts_from_members: [
			{
				date: '2025-05-11T15:21:00Z',
				message: 'My heating is not working. Please advise a service provider to contact urgently.',
				response: {
					date: '2025-05-12T09:00:00Z',
					message: 'Berghain Gas Limited reachable on 0123456789'
				}
			}
		],
		residences: [1, 2]
	};
</script>

<svelte:head>
	<title>{$_('menu.societies')}</title>
</svelte:head>

<h1>
	{$_('menu.societies')}
</h1>

<p>id: {id}</p>

<p>
	<a href={`${base}/societies`}> ← Back to all societies </a>
</p>

<article>
	<header>
		<h2>{data.member.name}</h2>
		<p>Society: {data.member.society} - {data.member.role}</p>
	</header>

	<main>
		<section>
			<h3>Society Details</h3>
			<ul>
				<li>Society Fund: {data.society_details.society_fund_eur} EUR</li>
				<li>Locale: {data.society_details.locale}</li>
				<li>Total Active Residences: {data.society_details.total_active_residences}</li>
				<li>Total Active Residents: {data.society_details.total_active_residents}</li>
				<li>Jurisdiction: {data.society_details.jurisdiction}</li>
				<li>Time Zone: {data.society_details.time_zone}</li>
				<li>Area Unit: {data.society_details.area_unit}</li>
				<li>Currency Code: {data.society_details.currency_code}</li>
			</ul>
		</section>

		<section>
			<h3>Wall Posts From Admin</h3>
			{#each data.wall_posts_from_admin as post}
				<article>
					<time datetime={post.date}>{post.date}</time>
					<p>{post.message}</p>
				</article>
			{/each}
		</section>

		<section>
			<h3>Posts from Members</h3>
			{#each data.posts_from_members as post}
				<article>
					<time datetime={post.date}>{post.date}</time>
					<p>{post.message}</p>
					{#if post.response}
						<aside>
							<time datetime={post.response.date}>{post.response.date}</time>
							<p>{post.response.message}</p>
						</aside>
					{/if}
				</article>
			{/each}
		</section>
	</main>

	<aside>
		<h3>My Residences in this Society:</h3>
		<ul>
			{#each data.residences as residence}
				<li>
					<a href={`${base}/residences/{residence}`}>{residence} </a>
				</li>
			{/each}
		</ul>
	</aside>
</article>
