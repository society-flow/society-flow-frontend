<script lang="javascript">
	import { _, locale as currentLocale, locales } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
  import { base } from '$app/paths';
	import EmojiIcon from '$lib/components/emoji-icon.svelte';

	// Split locale like "en-US" -> "en"
	const currentLocaleShort = $derived($currentLocale.split('-')[0]);

  function onchange(event) {
    const selectedLocale = event.target.value;
    
    const segments = page.url.pathname.split('/').filter(Boolean);
    console.log("current segments:", segments);

    // Replace first segment with new locale (assuming first segment is always locale)
    if ($locales.includes(segments[0])) {
        segments[0] = selectedLocale;
    } else {
        segments.unshift(selectedLocale);
    }

    const newPath = '/' + segments.join('/');
    $currentLocale = selectedLocale;
    console.log("newPath:", newPath);
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
