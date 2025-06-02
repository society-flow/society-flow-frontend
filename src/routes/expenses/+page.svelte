<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';

	const EXPENSES = [
		{ id: '1', name: 'Cleaning of public spaces' },
		{ id: '2', name: 'Electricity for public spaces' },
		{ id: '3', name: 'Water for public spaces' },
		{ id: '4', name: 'Repair the elevator' },
		{ id: '5', name: 'Gardening of public green spaces' }
	];
</script>

<svelte:head>
	<title>{$_('menu.expenses')}</title>
</svelte:head>

<h1>
	{$_('menu.expenses')}
</h1>

<ul>
	{#each EXPENSES as { id, name }}
		<li>
			<a href={`${base}/expenses/${id}`}>
				{name}
			</a>
		</li>
	{/each}
</ul>
