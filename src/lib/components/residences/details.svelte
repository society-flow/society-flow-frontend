<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	import RelativeDate from '$lib/components/date/relative.svelte';
  
	const { residence, society } = $props();
</script>

<main>
	<ul>
		<li>
			<strong>{$_('components.residences.details.name')}</strong>:
			<Anchor href={`/societies/${residence.id}`}>{residence.residenceName}</Anchor>
		</li>
		<li>
			<strong>{$_('components.residences.details.societyId')}</strong>:
			{#if society?.id}
				<Anchor href={`/societies/${society.id}`}>{society.name}</Anchor>
			{:else}
				{residence.societyId}
			{/if}
		</li>
		<li>
			<strong>{$_('components.residences.details.residentsCount')}</strong>: {residence.residentsCount}
		</li>
		<li>
			<strong>{$_('components.residences.details.floorCount')}</strong>: {residence.floorCount}
		</li>
		<li>
			<strong>{$_('components.residences.details.area')}</strong>:
			{residence.areaValue}
			{society.areaUnit}
		</li>
		<li>
			<strong>{$_('components.residences.details.percentageOwnership')}</strong>: {residence.percentageOwnership}%
		</li>
		<li>
			<strong>{$_('components.residences.details.active')}</strong>:
			{residence.isActive === null
				? $_('components.residences.details.active')
				: residence.isActive
					? $_('components.residences.details.yes')
					: $_('components.residences.details.no')}
		</li>
		<li>
			<strong>{$_('components.residences.details.description')}</strong>: {residence.description}
		</li>
		{#if residence.updatedAt}
			<li>
				<strong>
					{$_('common.updated')}
				</strong>
				<RelativeDate date={residence.updatedAt} />
			</li>
		{/if}
		{#if residence.createdAt}
			<li>
				<strong>
					{$_('common.created')}
				</strong>
				<RelativeDate date={residence.createdAt} />
			</li>
		{/if}
	</ul>
</main>
