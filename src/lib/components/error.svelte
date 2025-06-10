<script lang="javascript">
	import { _ } from 'svelte-i18n';

	const { error } = $props();
</script>

{#if error?.response}
	{error.response?.body?.message}
{:else if error?.message}
	{$_(`errors.${error.message}`)}
{/if}
