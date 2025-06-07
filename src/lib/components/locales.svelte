<script lang="javascript">
	import { _, locale as currentLocale, locales } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
  import { base } from '$app/paths';
	import EmojiIcon from '$lib/components/emoji-icon.svelte';
  import {translateCurrentPath} from "$lib/i18n.js";

	// Split locale like "en-US" -> "en"
	const currentLocaleShort = $derived($currentLocale.split('-')[0]);

  function onchange(event) {
    const selectedLocale = event.target.value;
    const newPath = translateCurrentPath(page.url.pathname, selectedLocale, base);
    
    $currentLocale = selectedLocale;
    goto(newPath, { replaceState: true });
  }
</script>

<aside title={$_('components.locales.language')}>
	<select {onchange}>
		{#each $locales as locale}
			<option
				value={locale}
				selected={currentLocaleShort === locale}
				disabled={currentLocaleShort === locale}
			>
				{locale}
			</option>
		{/each}
	</select>

	<EmojiIcon name="lang" />
</aside>
