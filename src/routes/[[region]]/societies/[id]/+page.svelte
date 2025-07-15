<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Error from '$lib/components/error.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import Icon from '$lib/components/icon.svelte';
	import SocietyDetails from '$lib/components/societies/details.svelte';
	import SocietyJoin from '$lib/components/societies/join.svelte';
	import ResidencesCount from '$lib/components/societies/residences-count.svelte';
	import FundCard from '$lib/components/funds/card.svelte';

	requiresAuth(locale);

	const { data } = $props();
	const { society, residencesCount, fund, userRole, isAdmin } = $derived(data);
	const { id, currency } = $derived(society);
	const { totalFund: total } = $derived(fund);
</script>

{#if isAdmin}
	<header>
		<nav>
			<ul>
				<li>
					<Anchor href={`/update/societies/${id}`} title={$_('menu.update.societies')} isButton>
						{$_('menu.update.societies')}
						<Icon icon="edit" />
					</Anchor>
				</li>
				<li>
					<Anchor href={`/delete/societies/${id}`} title={$_('common.delete')} isButton>
						{$_('common.delete')}
						<Icon icon="close" />
					</Anchor>
				</li>
			</ul>
		</nav>
	</header>
{/if}

<section>
	<SocietyDetails {society} {userRole} />
</section>

<section>
	<div>
		<FundCard {total} {currency} />
		<ResidencesCount count={residencesCount} />
	</div>
</section>

<style>
	div {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--s);
	}
</style>
