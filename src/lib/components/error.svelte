<script lang="javascript">
	import { _ } from 'svelte-i18n';

	const { error } = $props();
	const messageRoot = $derived(error?.message.split(' ')[0]);
</script>

{#if error?.message}
	{$_(`errors.${messageRoot}`, { default: error?.message })}
{/if}
