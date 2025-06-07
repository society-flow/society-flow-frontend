<script lang="javascript">
	const { error } = $props();
</script>

{#if error?.message}
	{error?.message}
{/if}
