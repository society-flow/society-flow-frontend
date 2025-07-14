<script>
	import { _ } from 'svelte-i18n';
	import { IconCheck, IconCaretUpDown } from 'obra-icons-svelte';

	const { distributions = [], showProgress = false } = $props();
	const activeDistributions = $derived(distributions.filter((d) => d.isActive));
	const coverageTotal = $derived(
		activeDistributions.reduce((sum, d) => sum + Number(d.percentageCoverage), 0)
	);
	const isValid = $derived(coverageTotal === 100);
  const isHigh = $derived(coverageTotal > 100)
  const isLow = $derived(coverageTotal < 100 || coverageTotal < 0)
</script>

<output class:isValid class:isLow class:isHigh>
	{#if showProgress}
		<progress max="100" value={coverageTotal}></progress>
	{/if}
	<span>
		{#if isValid}
			<IconCheck />
		{:else}
			<IconCaretUpDown />
		{/if}
		{coverageTotal}/100%
	</span>
</output>

<style>
	span,
	output {
		display: flex;
		align-items: center;
	}
  output {
    color: var(--c-status);
    &.isValid {
      --c-status: var(--c-success);      
    }
    &.isHigh {
      --c-status: var(--c-error);      
    }
    &.isLow {
      --c-status: var(--c-warn);      
    }
    progress {
		  &::-moz-progress-bar,
		  &::-webkit-progress-value {
			  background-color: var(--c-status);
        transition: background-color 200ms ease-in-out;
		  }
	  }
  }
</style>
