<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import Error from '$lib/components/error.svelte';
	import SocietyDetails from '$lib/components/societies/details.svelte';
	import SocietyJoin from '$lib/components/societies/join.svelte';
	import FundCard from '$lib/components/funds/card.svelte';
	import { IconClose, IconEdit } from 'obra-icons-svelte';

	requiresAuth(locale);

	const { data } = $props();
	const { society, userRole, isAdmin, fund } = $derived(data);
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
						<IconEdit />
					</Anchor>
				</li>
				<li>
					<Anchor href={`/delete/societies/${id}`} title={$_('common.delete')} isButton>
						{$_('common.delete')}
						<IconClose />
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
	<header>
		<h2>
			{$_('pages.funds')}
		</h2>
	</header>
	<FundCard {total} {currency} />
</section>
