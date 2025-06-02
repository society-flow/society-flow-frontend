<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';

	const RESIDENCES = [
		{ id: '1', name: 'flat-1', type: 'Admin' },
		{ id: '2', name: 'falt-2', type: 'Member' }
	];
</script>

<svelte:head>
	<title>{$_('menu.residences')}</title>
</svelte:head>

<h1>
	{$_('menu.residences')}
</h1>

<ul>
	{#each RESIDENCES as { id, name, type }}
		<li>
			<a href={`${base}/residences/${id}`}>
				{name} - {type}
			</a>
		</li>
	{/each}
</ul>
