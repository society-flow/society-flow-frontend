<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';

	const SOCIETIES = [
		{ id: '1', name: 'Paul Linke' },
		{ id: '2', name: 'Reichenberger' }
	];
</script>

<svelte:head>
	<title>{$_('menu.societies')}</title>
</svelte:head>

<h1>
	{$_('menu.societies')}
</h1>

<ul>
	{#each SOCIETIES as { id, name }}
		<li>
			<a href={`${base}/societies/${id}`}>
				{name}
			</a>
		</li>
	{/each}
</ul>
