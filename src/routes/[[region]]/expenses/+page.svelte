<script>
	import { _, locale } from 'svelte-i18n';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import ListExpenses from '$lib/components/expenses/list.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import Total from '$lib/components/expenses/total.svelte';
	import { IconAdd } from 'obra-icons-svelte';
	import { IconBusinessAlt } from 'obra-icons-svelte';

	requiresAuth(locale);

	const { data } = $props();
	const { societies, dicExpenses } = $derived(data);
</script>

<Page title={$_('menu.expenses')}>
	{#snippet header()}
		<h1>
			{$_('menu.expenses')}
		</h1>
	{/snippet}
	{#if societies}
		{#each societies as society}
			<section>
				<header>
					<h2>
						<IconBusinessAlt />
						<Anchor href={`/societies/${society.id}`}>
							{society.name}
						</Anchor>
					</h2>
					{#if societies}
						<nav>
							<ul>
								<li>
									<Total
										{society}
										expenses={dicExpenses[society.id] || []}
										currency={society.currency}
									/>
								</li>
								<li>
									<Anchor
										href={`/create/expenses?society=${society.id}`}
										title={$_('menu.create.expenses')}
										isButton
									>
										<IconAdd />
									</Anchor>
								</li>
							</ul>
						</nav>
					{/if}
				</header>
				<ListExpenses expenses={dicExpenses[society.id] || []} />
			</section>
		{/each}
	{/if}
</Page>
