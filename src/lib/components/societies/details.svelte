<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';

	import RelativeDate from '$lib/components/date/relative.svelte';

	let { society, userRole } = $props();
</script>

<main>
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
</main>
