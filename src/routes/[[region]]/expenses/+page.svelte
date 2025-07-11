<script>
	import { _, locale } from 'svelte-i18n';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import ListExpenses from '$lib/components/expenses/list.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	requiresAuth(locale);

	const { data } = $props();
	const { societies, dicExpenses } = $derived(data);
</script>

<Page title={$_('menu.expenses')}>
	{#snippet header()}
		<h1>{$_('menu.expenses')}</h1>
		{#if societies}
			<Anchor href="/create/expenses" isButton>{$_('menu.create.expenses')}</Anchor>
		{/if}
	{/snippet}
	{#if societies}
		{#each societies as society}
			<section>
				<h2><Anchor href={`/societies/${society.id}`}>{society.name}</Anchor></h2>
				<ListExpenses expenses={dicExpenses[society.id] || []} />
			</section>
		{/each}
	{/if}
</Page>
