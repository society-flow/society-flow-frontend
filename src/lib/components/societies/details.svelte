<script>
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	import Card from './card.svelte';
	import Map from '$lib/components/map.svelte';
	import Detail from '$lib/components/detail.svelte';
	import RelativeDate from '$lib/components/date/relative.svelte';
	import {
		IconLocationMarker,
		IconCoin,
		IconCompassTool,
		IconEditAlt,
		IconCalendarSelectedDate,
		IconWatch
	} from 'obra-icons-svelte';

	let { society, userRole } = $props();

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

<Detail title="{$_('components.societies.details.name')}:">
	{#snippet header()}
		<Card {society} />
	{/snippet}
	<ul>
		<li>
			<IconLocationMarker />
			<strong>
				{$_('components.societies.details.location')}:
			</strong>
			{[society.city, society.postcode, society.state, society.country]
				.filter((v) => !!v)
				.join(', ')}
		</li>
		<li>
			<IconCoin />
			<strong>
				{$_('components.societies.details.currency')}:
			</strong>
			{society.currency}
		</li>
		<li>
			<IconWatch />
			<strong>
				{$_('components.societies.details.timezone')}:
			</strong>
			{society.timezone}
		</li>
		<li>
			<IconCompassTool />
			<strong>
				{$_('components.societies.details.area_unit')}:
			</strong>
			{society.areaUnit}
		</li>

		{#if society.finerate}
			<li>
				<strong>{$_('components.societies.details.fine_rate')}:</strong>
				{society.finerate}
				{society.currency}
			</li>
		{/if}

		{#if society.geocoordinate}
			<li>
				<strong>{$_('components.societies.details.coordinates')}:</strong>
				{society.geocoordinate.x}, {society.geocoordinate.y}
			</li>
		{/if}
		{#if society.updatedAt}
			<li>
				<IconEditAlt />
				<strong>
					{$_('common.updated')}
				</strong>
				<RelativeDate date={society.updatedAt} />
			</li>
		{/if}
		{#if society.createdAt}
			<li>
				<IconCalendarSelectedDate />
				<strong>
					{$_('common.created')}
				</strong>
				<RelativeDate date={society.createdAt} />
			</li>
		{/if}
	</ul>
	{#snippet aside()}
		{#if markers.length}
			<Map {markers} />
		{/if}
	{/snippet}
</Detail>
