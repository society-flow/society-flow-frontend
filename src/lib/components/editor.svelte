<script>
	import { _ } from 'svelte-i18n';
	import DOMPurify from 'dompurify';

	let { value = $bindable(), placeholder = '', ...rest } = $props();

	const labels = $derived({
		writeTab: $_('common.write'),
		previewTab: $_('common.preview')
	});
</script>

<textarea bind:value {placeholder} />
