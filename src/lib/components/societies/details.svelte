<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	import Map from '$lib/components/map.svelte';
	import RelativeDate from '$lib/components/date/relative.svelte';

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

<main>
	<section>
		<ul>
			<li>
				<strong>{$_('components.societies.details.name')}:</strong>
				<Anchor href={`/societies/${society.id}`}>
					{society.name}
				</Anchor>
			</li>
			<li>
				<strong>{$_('components.societies.details.location')}:</strong>
				{society.city}, {society.state}, {society.country}
			</li>
			<li><strong>{$_('components.societies.details.postcode')}:</strong> {society.postcode}</li>
			<li><strong>{$_('components.societies.details.currency')}:</strong> {society.currency}</li>
			<li><strong>{$_('components.societies.details.timezone')}:</strong> {society.timezone}</li>
			<li><strong>{$_('components.societies.details.area_unit')}:</strong> {society.areaUnit}</li>

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
					<strong>
						{$_('common.updated')}
					</strong>
					<RelativeDate date={society.updatedAt} />
				</li>
			{/if}
			{#if society.createdAt}
				<li>
					<strong>
						{$_('common.created')}
					</strong>
					<RelativeDate date={society.createdAt} />
				</li>
			{/if}
		</ul>
	</section>

	{#if markers.length}
		<aside>
			<Map {markers} />
		</aside>
	{/if}
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 2fr 1fr;
		:global(.Map) {
			width: 100%;
		}
	}
	header {
		display: flex;
		flex-wrap: wrap;
		gap: var(--s);
		align-items: center;
		justify-content: space-between;
		:global(form) {
			border-color: transparent;
			padding: 0;
		}
		:global(fieldset) {
			margin: 0;
			padding: 0;
		}
	}
	main,
	header {
		:global(ul) {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		:global(li) {
			margin: calc(var(--s) / 3);
			padding: calc(var(--s) / 2);
		}
	}
</style>
