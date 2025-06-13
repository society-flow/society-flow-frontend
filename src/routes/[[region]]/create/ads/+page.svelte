<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import CreateAd from '$lib/components/ads/create.svelte';

	requiresAuth(locale);

	function handleCreated(data) {
		console.log('data', data);
	}
</script>

<Page title={$_('menu.create.ads')}>
	{#snippet header()}
		<div class="header-content">
			<h1>{$_('menu.create.ads')}</h1>
		</div>
	{/snippet}

	<section>
		<CreateAd onSuccess={handleCreated} />
	</section>
</Page>
