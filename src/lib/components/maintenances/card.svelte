<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	import RelativeDate from '$lib/components/date/relative.svelte';

	const { maintenance } = $props();
</script>

<article class="card">
	<header>
		<h3>{maintenance.yearMonth}</h3>
		<Anchor href={`/update/maintenances/${maintenance.id}`}>{$_('common.update')}</Anchor>
	</header>
	<section>
		<ul>
			<li>
				<strong>{$_('components.maintenances.card.isCurrent')}:</strong>
				{maintenance.isCurrent}
			</li>
			<li>
				<strong>{$_('components.maintenances.card.previousAmountToPay')}:</strong>
				{maintenance.previousAmountToPay}
			</li>
			<li>
				<strong>{$_('components.maintenances.card.fineToPay')}:</strong>
				{maintenance.fineToPay}
			</li>
			<li>
				<strong>{$_('components.maintenances.card.thisMonthCalculation')}:</strong>
				{maintenance.thisMonthCalculation}
			</li>
			<li>
				<strong>{$_('components.maintenances.card.totalAmountToPay')}:</strong>
				{maintenance.totalAmountToPay}
			</li>
			<li>
				<strong>{$_('components.maintenances.card.withFormula')}:</strong>
				{maintenance.withFormula}
			</li>
			<li>
				<strong>{$_('common.createdAt')}: </strong>
				<RelativeDate date={maintenance.createdAt} />
			</li>
			<li>
				<strong>{$_('common.updatedAt')}:</strong>
				<RelativeDate date={maintenance.updatedAt} />
			</li>
		</ul>
	</section>
</article>
