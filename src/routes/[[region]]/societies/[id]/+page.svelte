<script>
	import { _, locale } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import Error from '$lib/components/error.svelte';
	import SocietyDetails from '$lib/components/societies/details.svelte';
	import SocietyJoin from '$lib/components/societies/join.svelte';

	requiresAuth(locale);

	const { data } = $props();
	const { society } = data;
	const id = society.id;

	let userRole = $state(null);
	let loading = $state(true);
	let error = $state(null);

	let isOwner = $derived(userRole?.role === 'ADMIN');

	$effect(async () => {
		if (id && userState.user?.id) {
			loading = true;
			error = null;
			try {
				try {
					userRole = await api.getUserRoleInSociety(id, userState.user.id);
				} catch {
					userRole = null;
				}
			} catch (err) {
				error = err.message || 'Failed to load user role';
				console.error('Error loading user role:', err);
			} finally {
				loading = false;
			}
		}
	});

	function handleRoleUpdate(newRole) {
		userRole = newRole;
	}
</script>

{#if loading}
	<aside><center><progress /></center></aside>
{:else if error}
	<section><Error {error} /></section>
{:else}
	<aside>
		<nav>
			<ul>
				{#if !userRole}
					<li><SocietyJoin societyId={id} {userRole} onJoin={handleRoleUpdate} /></li>
				{/if}
				{#if isOwner}
					<li>
						<Anchor href={`/update/societies/${id}`} isButton title={$_('menu.update.societies')}>
							{$_('menu.update.societies')}
						</Anchor>
					</li>
					<li>
						<Anchor
							href={`/delete/societies/${id}`}
							isButton
							data-type="error"
							title={$_('common.delete')}
						>
							{$_('common.delete')}
						</Anchor>
					</li>
				{/if}
			</ul>
		</nav>
	</aside>
	<SocietyDetails {society} {userRole} />
{/if}
