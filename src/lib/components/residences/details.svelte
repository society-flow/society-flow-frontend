<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	import FormatDateRelative from '$lib/components/format/date-relative.svelte';
	import Detail from '$lib/components/detail.svelte';
	import Card from './card.svelte';
	import Map from '$lib/components/map.svelte';
	import SocietyCard from '$lib/components/societies/card.svelte';
	import Icon from '$lib/components/icon.svelte';

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
		<Card {residence} />
		<SocietyCard {society} />
	{/snippet}
	<ul>
		<li>
			<Icon icon="users" />
			<strong>{$_('components.residences.details.residentsCount')}</strong>: {residence.residentsCount}
		</li>
		<li>
			<Icon icon="layers" />
			<strong>{$_('components.residences.details.floorCount')}</strong>: {residence.floorCount}
		</li>
		<li>
			<Icon icon="grid" />
			<strong>{$_('components.residences.details.area')}</strong>:
			{residence.areaValue}
			{society.areaUnit}
		</li>
		<li>
			<Icon icon="orange-slice" />
			<strong>{$_('components.residences.details.percentageOwnership')}</strong>: {residence.percentageOwnership}%
		</li>
		<li>
			{#if residence.isActive}
				<Icon icon="checkbox-off" />
			{:else}
				<Icon icon="check" />
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
				<Icon icon="document-alt" />
				<strong>{$_('components.residences.details.description')}</strong>: {residence.description}
			</li>
		{/if}
		{#if residence.updatedAt}
			<li>
				<Icon icon="watch" />
				<strong>
					{$_('common.updated')}
				</strong>
				<FormatDateRelative date={residence.updatedAt} />
			</li>
		{/if}
		{#if residence.createdAt}
			<li>
				<strong>
					<Icon icon="calendar-selected-date" />
					{$_('common.created')}
				</strong>
				<FormatDateRelative date={residence.createdAt} />
			</li>
		{/if}
	</ul>

	{#snippet aside()}
		{#if markers.length}
			<Map {markers} />
		{/if}
	{/snippet}
</Detail>
