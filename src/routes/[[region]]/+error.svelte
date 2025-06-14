<script lang="javascript">
	import { page } from '$app/stores';
	import Page from '$lib/components/routes/page.svelte';
</script>

<Page title={$page.status} isCenter>
	{#snippet header()}
		<h1>{$page.status}: {$page.error.message}</h1>
	{/snippet}
	<p class="text-center">The requested page does not exist on this website.</p>
</Page>
