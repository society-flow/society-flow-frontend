<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import CreateSociety from '$lib/components/societies/create.svelte';

	requiresAuth(locale);

	function handleSocietyCreated(newSociety) {
		console.log('newSociety', newSociety);
	}
</script>

<Page title={$_('menu.create.societies')}>
	{#snippet header()}
		<div class="header-content">
			<h1>{$_('menu.create.societies')}</h1>
		</div>
	{/snippet}

	<section>
		<CreateSociety onSuccess={handleSocietyCreated} />
	</section>
</Page>
