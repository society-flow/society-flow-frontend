<script lang="javascript">
	import { _ } from 'svelte-i18n';
	export let residence;
</script>

<article class="Detail">
	<header>
		<h2>{residence.residenceName}</h2>
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
					? $_('components.residences.details.unknown')
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
</article>
