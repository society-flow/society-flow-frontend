<!-- src/_layout.svelte -->
<script type="module">
	import { waitLocale } from 'svelte-i18n';
	import '$lib/i18n.js';

	export async function preload() {
		// awaits for the loading of the 'en-US' and 'en' dictionaries
		return waitLocale();
	}

	const { children } = $props();
</script>

{@render children()}
