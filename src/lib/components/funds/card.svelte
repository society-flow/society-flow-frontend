<script>
	const valProps = $props();
</script>

<article>
	{valProps.total}
	{valProps.currency}
</article>

<style>
	article {
		background-color: var(--c-bg--secondary);
		padding: var(--s) calc(var(--s) * 2);
		border: 1px solid transparent;
		border-radius: var(--border-radius);
	}
</style>
