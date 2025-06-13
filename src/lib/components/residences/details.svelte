<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';

	const { residence } = $props();
</script>

<header>
	<h1>
		<Anchor href={`/residences/${residence.id}`}>
			{residence.residenceName}
		</Anchor>
	</h1>
</header>

<main>
	<ul>
		<li>{$_('components.residences.details.societyId')}: {residence.societyId}</li>
		<li>{$_('components.residences.details.residentsCount')}: {residence.residentsCount}</li>
		<li>{$_('components.residences.details.floorCount')}: {residence.floorCount}</li>
		<li>{$_('components.residences.details.area')}: {residence.areaValue}</li>
		<li>
			{$_('components.residences.details.active')}:
			{residence.isActive === null
				? $_('components.residences.details.active')
				: residence.isActive
					? $_('components.residences.details.yes')
					: $_('components.residences.details.no')}
		</li>
		<li>{$_('components.residences.details.description')}: {residence.description}</li>
		<li>{$_('components.residences.details.createdAt')}: {residence.createdAt}</li>
		<li>
			{$_('components.residences.details.updatedAt')}: {residence.updatedAt ??
				$_('components.residences.details.notAvailable')}
		</li>
	</ul>
</main>
