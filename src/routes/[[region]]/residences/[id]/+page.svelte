<script>
	import { _ } from 'svelte-i18n';
	import { invalidate } from '$app/navigation';
	import Anchor from '$lib/components/anchor.svelte';
	import ResidenceDetails from '$lib/components/residences/details.svelte';
	import SocietyCard from '$lib/components/societies/card.svelte';
    import ResidenceJoin from "$lib/components/residences/join.svelte";
    import FundCard from '$lib/components/funds/card.svelte';

	const { data } = $props();
	const { residence, fund, isMember, society, isAdmin } = $derived(data);
	const { totalFund: total } = $derived(fund);
	const { currency } = $derived(society);
	const id = $derived(residence.id);

	async function handleJoin(data) {
		invalidate('data:residence');
	}
</script>

<aside>
	<SocietyCard {society} />
</aside>

<ResidenceDetails {residence} {isMember} {society} />

<aside>
	<nav>
		<ul>
			{#if isAdmin || isMember}
				<li>
					<Anchor href={`/update/residences/${id}`} title={$_('menu.update.residences')} isButton>
						{$_('menu.update.residences')}
					</Anchor>
				</li>
			{/if}
            {#if isAdmin}
                <li>
                    <Anchor href={`/delete/residences/${id}`} title={$_('common.delete')} isButton>
                        {$_('common.delete')}
                    </Anchor>
                </li>
            {/if}
            {#if !isMember}
                <li>
                    <ResidenceJoin
                        residenceId={id}
                        societyId={residence.societyId}
                        {isMember}
                        onJoin={handleJoin}
                    />
                </li>
            {/if}
		</ul>
	</nav>
</aside>

<FundCard {total} {currency} />