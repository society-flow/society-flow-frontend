<script lang="javascript">
	import { page } from '$app/stores';
	import Page from '$lib/components/routes/page.svelte';
	import { _ } from 'svelte-i18n';
</script>

<Page title={$page.status} isCenter>
	{#snippet header()}
		<h1>{$page.status}: {$page.error.message}</h1>
	{/snippet}
	<span>{$_('pages.error.not_found')}</span>
</Page>
