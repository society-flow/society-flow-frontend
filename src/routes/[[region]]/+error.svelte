<script>
	import { page } from '$app/stores';
	import Page from '$lib/components/routes/page.svelte';
</script>

<Page title={$page.status}>
	{#snippet header()}
		<h1>{$page.status}: {$page.error.message}</h1>
	{/snippet}
	<p>The requested page does not exist on this website.</p>
</Page>
