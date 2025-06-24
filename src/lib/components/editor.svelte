<script>
	import { _ } from 'svelte-i18n';
	import { Carta, MarkdownEditor } from 'carta-md';
	import DOMPurify from 'dompurify';

	let { value = $bindable(), placeholder = '', ...rest } = $props();

	const labels = $derived({
		writeTab: $_('common.write'),
		previewTab: $_('common.preview')
	});

	// let value = $derived(DOMPurify.sanitize(rawValue));
</script>

<textarea bind:value placeholder />

<style>
</style>
