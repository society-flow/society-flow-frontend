<script>
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import Error from '$lib/components/error.svelte';
	import ResidencesList from '$lib/components/residences/list.svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);

	let residences = $state([]);
	let userRole = $state(null);
	let loading = $state(true);
	let error = $state(null);

	$effect(async () => {
		if (id) {
			loading = true;
			error = null;
			try {
				residences = await api.getAllResidencesInSociety(id);
				try {
					userRole = await api.getUserRoleInSociety(id, userState.user.id);
				} catch {
					userRole = null;
				}
			} catch (err) {
				error = err.message || 'Failed to load residences';
				console.error('Error loading residences:', err);
			} finally {
				loading = false;
			}
		}
	});

	let triggering = $state({});

    async function triggerMaintenanceCalculation() {
        const currentDate = new Date();
        const yearMonth = parseInt(
            `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`
        );

        triggering = true;

        try {
            await api.triggerSocietyMaintenanceCalculation(id, yearMonth);
            // You could add a success notification here
        } catch (error) {
            console.error($_('pages.maintenances.calculationFailed'), error);
            // You could add an error notification here
        } finally {
            triggering = false;
        }
    }
</script>

{#if loading}
	<aside><center><progress /></center></aside>
{:else if error}
	<section><Error {error} /></section>
{:else}
	<section>
		<header>
			<h2>{$_('menu.residences')}</h2>
			{#if userRole}
				<nav>
					<li>
						<Anchor href={`/create/residences/${id}`} isButton>
							{$_('menu.create.residences')}
						</Anchor>
					</li>
					<li>
                        <button on:click={triggerMaintenanceCalculation}>
                            {$_('pages.societies.detail.triggerCalculations')}
                        </button>
					</li>
				</nav>
			{/if}
		</header>
		<ResidencesList {residences} />
	</section>
{/if}
