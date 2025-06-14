<script lang="javascript">
	import { _, json } from 'svelte-i18n';
	import SvgIcon from '$lib/components/svg-icon.svelte';
	import { userState } from '$lib/states/user.svelte.js';

	const marketingUserTypes = $derived($json('pages.home.marketing.user_types'));
</script>

{#if !userState.isAuth}
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
{/if}

<style>
  article {
		margin-bottom: calc(var(--s) * 2);
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.Cards {
		display: grid;
		justify-content: center;
		gap: calc(var(--s) * 1);
		@media (min-width: 50rem) {
			gap: calc(var(--s) * 2);
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	.Card {
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
				transform: scale(1.05);
			}
		}
	}
</style>
