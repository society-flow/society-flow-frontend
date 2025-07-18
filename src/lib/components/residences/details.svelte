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
						coordinates: [society.geoCoordinate.y, society.geoCoordinate.x],
						title: society.name || society.id
					}
				]
			: []
	);
</script>

<Detail>
	{#snippet header()}
		<Card {residence} showChildren={false} />
		<SocietyCard {society} />
	{/snippet}
	<ul>
		<li>
			<Icon icon="users">
				<strong>{$_('components.residences.details.residentsCount')}</strong>
			</Icon>
			{residence.residentsCount}
		</li>
		<li>
			<Icon icon="layers">
				<strong>{$_('components.residences.details.floorCount')}</strong>
			</Icon>
			{residence.floorCount}
		</li>
		<li>
			<Icon icon="grid">
				<strong>{$_('components.residences.details.area')}</strong>
			</Icon>
			{residence.areaValue}
			{society.areaUnit}
		</li>
		<li>
			<Icon icon="orange-slice">
				<strong>{$_('components.residences.details.percentageOwnership')}</strong>
			</Icon>
			{residence.percentageOwnership}%
		</li>
		<li>
			<Icon icon={residence.isActive ? 'check' : 'checkbox-off'}>
				<strong>{$_('components.residences.details.active')}</strong>:
			</Icon>
			{residence.isActive === null
				? $_('components.residences.details.active')
				: residence.isActive
					? $_('components.residences.details.yes')
					: $_('components.residences.details.no')}
		</li>
		{#if residence.description}
			<li>
				<Icon icon="document-alt">
					<strong>{$_('components.residences.details.description')}</strong>
				</Icon>
				{residence.description}
			</li>
		{/if}
		{#if residence.updatedAt}
			<li>
				<Icon icon="watch">
					<strong>
						{$_('common.updated')}
					</strong>
					<FormatDateRelative date={residence.updatedAt} />
				</Icon>
			</li>
		{/if}
		{#if residence.createdAt}
			<li>
				<Icon icon="calendar-selected-date">
					<strong>
						{$_('common.created')}
					</strong>
				</Icon>
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
