<!-- src/_layout.svelte -->
<script>
	import { waitLocale } from 'svelte-i18n';
	import '$lib/i18n.js';
  import Menu from "$lib/components/site/menu.svelte"

	export async function preload() {
		// awaits for the loading of the language ("en"...) dictionaries
		return waitLocale();
	}
</script>

<Menu/>
<slot />
