<script>
	import { _ } from 'svelte-i18n';
	import { EXPENSE_DISTRIBUTION_TYPES as typeOptions } from '$lib/const/expense_distribution_types.js';
	import { IconAdd } from 'obra-icons-svelte';

	export let distributions;
	export let distError;
	export let addDistribution;
	export let saveDistributions;
	export let removeDistribution;
</script>

<form>
	{#each distributions as d, index}
		{#if d.isActive}
			<section>
				<fieldset>
					<legend>
						{$_('pages.expenses.detail.selectType')}
					</legend>
					<select bind:value={distributions[index].calculationMode}>
						{#each typeOptions as opt}
							<option value={opt}>
								{$_(`const.expense_types.${opt}`)}
							</option>
						{/each}
					</select>
				</fieldset>
				<fieldset>
					<legend>
						{$_('pages.expenses.detail.percentageCoverage')} (%)
					</legend>
					<input
						type="number"
						min="0"
						max="100"
						bind:value={distributions[index].percentageCoverage}
					/>
				</fieldset>
				<fieldset>
					<button type="button" onclick={() => removeDistribution(d)}>
						{$_('pages.expenses.detail.remove')}
					</button>
				</fieldset>
			</section>
		{/if}
	{/each}
	<footer>
		<fieldset>
			<button type="button" onclick={addDistribution}>
				<IconAdd />
				{$_('pages.expenses.detail.addDistribution')}
			</button>
			<button type="button" onclick={saveDistributions}>
				{$_('pages.expenses.detail.saveDistributions')}
			</button>
		</fieldset>
	</footer>
	{#if distError}
		<p class="error">{distError}</p>
	{/if}
</form>

<style>
	form {
		section {
			display: flex;
			align-items: center;
		}
		footer {
			fieldset {
				flex-direction: row;
				justify-content: flex-end;
			}
		}
	}
</style>
