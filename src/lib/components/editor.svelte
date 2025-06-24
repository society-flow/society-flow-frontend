<script>
	import { _ } from 'svelte-i18n';

	let { value = $bindable(), placeholder = '', ...rest } = $props();
</script>

<textarea bind:value {placeholder} />
