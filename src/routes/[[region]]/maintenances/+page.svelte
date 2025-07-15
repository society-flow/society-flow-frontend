<script>
	import { _, locale } from 'svelte-i18n';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import MaintenanceList from '$lib/components/maintenances/list.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import Icon from '$lib/components/icon.svelte';

	requiresAuth(locale);

	const { data } = $props();
	const { societies, dicMaintenances } = $derived(data);
</script>

<Page title={$_('menu.maintenances')}>
	{#snippet header()}
		<h1>{$_('menu.maintenances')}</h1>
	{/snippet}
	{#if societies}
		{#each societies as society}
			<section>
				<header>
					<h2>
						<Icon icon="business-alt" />
						<Anchor href={`/societies/${society.id}`}>
							{society.name}
						</Anchor>
					</h2>
					<nav>
						<ul>
							<li>
								<Anchor
									href={`/create/maintenances?society=${society.id}`}
									title={$_('menu.create.maintenances')}
									isButton
								>
									<Icon icon="add" />
								</Anchor>
							</li>
						</ul>
					</nav>
				</header>
				<MaintenanceList maintenances={dicMaintenances[society.id] || []} {society} />
			</section>
		{/each}
	{/if}
</Page>
