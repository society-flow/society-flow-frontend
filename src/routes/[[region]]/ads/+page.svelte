<script type="javascript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	// import { api } from '$lib/api.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Card from '$lib/components/card.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	let adverts = $state([]);
	$effect(async () => {
		// adverts = await api.getAdverts();
	});
</script>

<Page title={$_('menu.adverts')}>
	{#snippet header()}
		<h1>{$_('menu.adverts')}</h1>
	{/snippet}
	<section>
		{#if adverts.length}
			<ul>
				{#each adverts as { id, name } (id)}
					<li>
						<Card>
							<Anchor href={`/ads/${id}`}>
								{name}
							</Anchor>
						</Card>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-center">ø {$_('menu.adverts')}</p>
		{/if}
	</section>
</Page>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: calc(var(--s) / 3);
	}
</style>
