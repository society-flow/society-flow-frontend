<script lang>
	import { _ } from 'svelte-i18n';
	import { page } from '$app/state';
	import SettingsApi from '$lib/components/settings/api.svelte';

	const apiUrl = page.url.searchParams.get('api-url');
</script>

<svelte:head>
	<title>{$_('menu.settings')}</title>
</svelte:head>

<header>
	<h1>
		{$_('menu.settings')}
	</h1>
</header>

<section>
	<SettingsApi {apiUrl} />
</section>
