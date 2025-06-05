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
			transition: all 200ms ease-in-out;
      outline: 1px solid transparent;
			&:hover {
				border-color: var(--c-fg);
				text-decoration: underline var(--c-link);
			}
      &:focus {
        outline: 1px solid var(--c-fg);
			}
		}
	}
</style>
