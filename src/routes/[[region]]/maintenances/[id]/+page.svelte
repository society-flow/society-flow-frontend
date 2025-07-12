<script>
	import { _, locale } from 'svelte-i18n';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import MaintenanceCard from '$lib/components/maintenances/card.svelte';
	import SocietyCard from '$lib/components/societies/card.svelte';
	import ResidenceCard from '$lib/components/residences/card.svelte';
	import MaintenancePaymentForm from '$lib/components/maintenances/payment-form.svelte';
	import MaintenancePaymentList from '$lib/components/maintenances/payment-list.svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);
	const { data } = $props();
	const { maintenance, society, residence, payments } = $derived(data);

	async function onPaymentSuccess() {
		invalidate('data:maintenance');
	}
</script>

<Page title={$_('menu.maintenances')} showHeader>
	{#if maintenance}
		<header>
			<nav>
				<ul>
					<li>
						<Anchor href={`/update/maintenances/${maintenance.id}`} isButton>
							{$_('common.update')}
						</Anchor>
					</li>
				</ul>
			</nav>
		</header>

		<section>
			<MaintenanceCard {maintenance} />
			<SocietyCard {society} />
			<ResidenceCard {residence} />
		</section>

		<section>
			<MaintenancePaymentForm maintenance={maintenance} residenceId={residence.id} onSuccess={onPaymentSuccess} />
		</section>
		<section>
			<MaintenancePaymentList payments={payments} society={society} />
		</section>
	{/if}
</Page>
