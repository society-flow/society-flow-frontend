<script>
	import { _, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import ResidencesList from '$lib/components/residences/list.svelte';
	import { IconAdd } from 'obra-icons-svelte';

	requiresAuth(locale);

	const id = $derived($page.params.id);
	const { data } = $props();
	const { userResidences, residences, userRole } = $derived(data);
</script>

{#if userResidences}
	<section>
		<header>
			<h2>
				{$_('pages.societies.detail.user_residences')}
			</h2>
		</header>
		<ResidencesList residences={userResidences} />
	</section>
{/if}

<section>
	<header>
		<h2>{$_('menu.residences')}</h2>
		{#if userRole}
			<nav>
				<li>
					<Anchor href={`/create/residences/${id}`} title={$_('menu.create.residences')} isButton>
						<IconAdd />
					</Anchor>
				</li>
			</nav>
		{/if}
	</header>
	<ResidencesList {residences} />
</section>
