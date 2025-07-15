<script>
	import { _ } from 'svelte-i18n';
	import { invalidate } from '$app/navigation';
	import Anchor from '$lib/components/anchor.svelte';
	import Icon from '$lib/components/icon.svelte';
	import ResidenceDetails from '$lib/components/residences/details.svelte';
	import ResidenceJoin from '$lib/components/residences/join.svelte';
	import FundCard from '$lib/components/funds/card.svelte';

	let { data } = $props();
	const { residence, fund, society, isMember, isAdmin } = $derived(data);
	const { totalFund: total } = $derived(fund);
	const { currency } = $derived(society);
	const id = $derived(residence.id);

	function onJoin() {
		invalidate('data:residence');
	}
</script>

<header>
	<nav>
		<ul>
			{#if isAdmin || isMember}
				<li>
					<Anchor href={`/update/residences/${id}`} title={$_('menu.update.residences')} isButton>
						{$_('menu.update.residences')}
						<Icon icon="edit" />
					</Anchor>
				</li>
			{/if}
			{#if isAdmin}
				<li>
					<Anchor href={`/delete/residences/${id}`} title={$_('common.delete')} isButton>
						{$_('common.delete')}
						<Icon icon="close" />
					</Anchor>
				</li>
			{/if}
			{#if !isMember}
				<li>
					<ResidenceJoin residenceId={id} societyId={residence.societyId} {isMember} {onJoin} />
				</li>
			{/if}
		</ul>
	</nav>
</header>

<section>
	<ResidenceDetails {residence} {isMember} {society} />
</section>

<section>
	<header>
		<h2>
			{$_('pages.funds')}
		</h2>
	</header>
	<FundCard {total} {currency} />
</section>
