<!-- src/_layout.svelte -->
<script>
	import { waitLocale } from 'svelte-i18n';
	import '$lib/i18n.js';

	export async function preload() {
		// awaits for the loading of the language ("en"...) dictionaries
		return waitLocale();
	}
</script>

<slot />
