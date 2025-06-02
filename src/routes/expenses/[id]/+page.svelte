<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	$: id = $page.params.id;
</script>

<svelte:head>
	<title>{$_('menu.expenses')}</title>
</svelte:head>

<h1>
	{$_('menu.expenses')}
</h1>

<p>id: {id}</p>

<p>
	<a href={`${base}/expenses`}> ← Back to all expenses </a>
</p>
