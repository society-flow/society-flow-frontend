<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';

  const id = $derived($page.params.id);

	let society = $state({});

	$effect(async () => {
    if (id) {
		  society = await api.getSociety(Number(id));
    }
	});
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
		<h2>{society.id}</h2>
		<p>Society: {society.name} - {society.role}</p>
	</header>

	<main>
		<section>
			<h3>Society Details</h3>
			<ul>
				<li>Society Fund: {society.fund} {society.currency_code}</li>
				<li>Locale: {society.locale}</li>
				<li>Total Active Residences: {society.total_active_residences}</li>
				<li>Total Active Residents: {society.total_active_residents}</li>
				<li>Jurisdiction: {society.jurisdiction}</li>
				<li>Time Zone: {society.time_zone}</li>
				<li>Area Unit: {society.area_unit}</li>
				<li>Currency Code: {society.currency_code}</li>
			</ul>
		</section>

		<section>
			<h3>Wall Posts From Admin</h3>
			{#each society.wall_posts_from_admin as post}
				<article>
					<time datetime={post.date}>{post.date}</time>
					<p>{post.message}</p>
				</article>
			{/each}
		</section>

		<section>
			<h3>Posts from Members</h3>
			{#each society.posts_from_members as post}
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
			{#each society.residences as residence}
				<li>
					<a href={`${base}/residences/${residence}`}>{residence} </a>
				</li>
			{/each}
		</ul>
	</aside>
</article>
