<script type="javascript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { api } from '$lib/api.svelte.js';

	let adverts = $state([]);
	$effect(async () => {
		adverts = await api.getAdverts();
	});
</script>

<svelte:head>
	<title>{$_('menu.adverts')}</title>
</svelte:head>

<header>
	<h1>{$_('menu.adverts')}</h1>
</header>

<section>
	<ul class="Cards">
		{#each adverts as { id, name } (id)}
			<li class="Card">
				<a href={`${base}/ads/${id}`}>
					{name}
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.Cards {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: calc(var(--s) / 3);
	}
	.Card {
		a {
			display: flex;
			padding: calc(var(--s) * 2);
			border: 1px solid var(--c-border);
			background-color: var(--c-bg--secondary);
			border-radius: var(--border-radius);
			text-decoration: underline;
			text-decoration-color: transparent;
			transition: all 150ms ease-in-out;
      outline: 1px solid transparent;
      font-weight: normal;
			&:hover {
				text-decoration: underline var(--c-link);
				border-color: var(--c-bg--secondary);
        background-color: transparent;
        font-weight: bold;
			}
      &:focus {
        outline: 1px solid var(--c-fg);
        font-weight: bold;
			}
		}
	}
</style>
