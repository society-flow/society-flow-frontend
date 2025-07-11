<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	import RelativeDate from '$lib/components/date/relative.svelte';
	import Detail from '$lib/components/detail.svelte';
	import Card from './card.svelte';
	import Map from '$lib/components/map.svelte';
	import SocietyCard from '$lib/components/societies/card.svelte';
	import {
		IconCompassTool,
		IconEditAlt,
		IconCalendarSelectedDate,
		IconWatch,
		IconDocumentAlt,
		IconCheck,
		IconCheckboxOff,
		IconSpeedometer,
		IconMountains,
		IconUsers,
		IconRuler
	} from 'obra-icons-svelte';

	const { residence, society } = $props();

	const markers = $derived(
		society?.geoCoordinate
			? [
					{
						coordinates: [society.geoCoordinate.x, society.geoCoordinate.y],
						title: society.name || society.id
					}
				]
			: []
	);
</script>

<Detail>
	{#snippet header()}
		<SocietyCard {society} />
		<Card {residence} />
	{/snippet}
	<ul>
		<li>
			<IconUsers />
			<strong>{$_('components.residences.details.residentsCount')}</strong>: {residence.residentsCount}
		</li>
		<li>
			<IconMountains />
			<strong>{$_('components.residences.details.floorCount')}</strong>: {residence.floorCount}
		</li>
		<li>
			<IconRuler />
			<strong>{$_('components.residences.details.area')}</strong>:
			{residence.areaValue}
			{society.areaUnit}
		</li>
		<li>
			<IconSpeedometer />
			<strong>{$_('components.residences.details.percentageOwnership')}</strong>: {residence.percentageOwnership}%
		</li>
		<li>
			{#if residence.isActive}
				<IconCheckboxOff />
			{:else}
				<IconCheck />
			{/if}
			<strong>{$_('components.residences.details.active')}</strong>:
			{residence.isActive === null
				? $_('components.residences.details.active')
				: residence.isActive
					? $_('components.residences.details.yes')
					: $_('components.residences.details.no')}
		</li>

		{#if residence.description}
			<li>
				<IconDocumentAlt />
				<strong>{$_('components.residences.details.description')}</strong>: {residence.description}
			</li>
		{/if}
		{#if residence.updatedAt}
			<li>
				<IconWatch />
				<strong>
					{$_('common.updated')}
				</strong>
				<RelativeDate date={residence.updatedAt} />
			</li>
		{/if}
		{#if residence.createdAt}
			<li>
				<strong>
					<IconCalendarSelectedDate />
					{$_('common.created')}
				</strong>
				<RelativeDate date={residence.createdAt} />
			</li>
		{/if}
	</ul>

	{#snippet aside()}
		{#if markers.length}
			<Map {markers} />
		{/if}
	{/snippet}
</Detail>
