<script>
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	import Card from './card.svelte';
	import Map from '$lib/components/map.svelte';
	import Icon from '$lib/components/icon.svelte';
	import Detail from '$lib/components/detail.svelte';
	import FormatDateRelative from '$lib/components/format/date-relative.svelte';
	import FormatCurrency from '$lib/components/format/currency.svelte';

	let { society, userRole } = $props();
	const location = $derived(
		[society.city, society.postcode, society.state, society.country].filter((v) => !!v).join(', ')
	);

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
		<Card {society} showChildren={false} />
	{/snippet}
	<ul>
		{#if location}
			<li>
				<Icon icon="location-marker" />
				<strong>
					{$_('components.societies.details.location')}:
				</strong>
				{location}
			</li>
		{/if}
		{#if society.currency}
			<li>
				<Icon icon="coin" />
				<strong>
					{$_('components.societies.details.currency')}:
				</strong>
				{society.currency}
			</li>
		{/if}
		{#if society.timezone}
			<li>
				<Icon icon="watch" />
				<strong>
					{$_('components.societies.details.timezone')}:
				</strong>
				{society.timezone}
			</li>
		{/if}
		{#if society.areaUnit}
			<li>
				<Icon icon="compass-tool" />
				<strong>
					{$_('components.societies.details.area_unit')}:
				</strong>
				{society.areaUnit}
			</li>
		{/if}

		{#if society.finerate}
			<li>
				<Icon icon="gavel" />
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
				<Icon icon="edit-alt" />
				<strong>
					{$_('common.updated')}
				</strong>
				<FormatDateRelative date={society.updatedAt} />
			</li>
		{/if}
		{#if society.createdAt}
			<li>
				<Icon icon="calendar-selected-date" />
				<strong>
					{$_('common.created')}
				</strong>
				<FormatDateRelative date={society.createdAt} />
			</li>
		{/if}
	</ul>
	{#snippet aside()}
		{#if markers.length}
			<Map {markers} />
		{/if}
	{/snippet}
</Detail>
