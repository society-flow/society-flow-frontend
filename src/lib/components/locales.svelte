<script lang="javascript">
	import { _, locale as currentLocale, locales } from 'svelte-i18n';
	import EmojiIcon from '$lib/components/emoji-icon.svelte';

	const currentLocalePaths = $derived($currentLocale.split('-'));
	const currentLocaleRoot = $derived(currentLocalePaths[0]);
	$effect(() => {
		console.log('currentLocaleRoot', currentLocaleRoot);
	});
</script>

<aside title={$_('components.locales.language')}>
	<select bind:value={$currentLocale}>
		{#each $locales as locale}
			<option
				value={locale}
				selected={console.log('locccc', locale) && currentLocaleRoot === locale}>{locale}</option
			>
		{/each}
	</select>

	<EmojiIcon name="lang" />
</aside>
