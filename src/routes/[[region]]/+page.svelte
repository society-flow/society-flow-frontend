<script lang="javascript">
	import { _, json } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import { api } from '$lib/api.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import ListSocieties from '$lib/components/societies/list.svelte';
	import ListResidences from '$lib/components/residences/list.svelte';
	import HomeLogo from '$lib/components/home-logo.svelte';
	import SvgIcon from '$lib/components/svg-icon.svelte';
	import { getBlog } from '$lib/db-static.js';

	let blog = $state({});
	$effect(async () => {
		blog = await getBlog('index');
		console.log('blog', blog.name);
	});

	let societies = $state([]);
	$effect(async () => {
		societies = await api.getSocieties();
	});

	let residences = $state([]);
	$effect(async () => {
		residences = await api.getResidences();
	});

	const marketingUserTypes = $derived($json('pages.home.marketing.user_types'));
	const titleOneWord = $derived($_('title').split(' ').join(''));
</script>

<Page title={$_('title')}>
	{#snippet header()}
		{#if userState.isAuth}
			<p>
				{$_('pages.home.auth.greeting', {
					values: { name: userState?.user?.name, email: userState?.user?.email }
				})}
			</p>
		{:else}
			<h1>{titleOneWord}</h1>
			<p>{$_('catch_line')}</p>
			<center>
				<a href="{base}/auth/register">
					<HomeLogo />
				</a>
			</center>
		{/if}
	{/snippet}

	{#if userState.isAuth}
		<section>
			<header>
				<h2>{$_('pages.home.auth.dashboard.title')}</h2>
				<p>{$_('pages.home.auth.dashboard.description')}</p>
			</header>
		</section>
		<section>
			<article>
				{#if societies?.length}
					<h2>{$_('pages.home.auth.sections.societies')}</h2>
					<ListSocieties {societies} />
				{/if}
			</article>
		</section>
		<section>
			<article>
				{#if residences?.length}
					<h2>{$_('pages.home.auth.sections.residences')}</h2>
					<ListResidences {residences} />
				{/if}
			</article>
		</section>
	{:else}
		<section>
			<ul class="Cards">
				{#each Object.entries(marketingUserTypes) as [key, userType]}
					<li class="Card">
						<article>
							<header>
								<h2>{userType.title}</h2>
							</header>
							<main>
								<ul>
									{#each userType.features as feature}
										<li>{feature}</li>
									{/each}
								</ul>
							</main>
							<aside>
								<SvgIcon
									name={key === 'society_admin'
										? 'admin'
										: key === 'society_member'
											? 'member'
											: 'rent'}
								/>
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
						{$_('pages.home.marketing.call_to_action', { values: { title: titleOneWord } })}
					</p>
				</center>
			{/if}
			<center>
				<a href="{base}/auth/login">{$_('menu.login')}</a>
			</center>
		</section>
	{/if}
</Page>

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
