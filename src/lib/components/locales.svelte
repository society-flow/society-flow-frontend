<script lang="javascript">
	import { locale as currentLocale, locales } from 'svelte-i18n';

	const currentLocalePaths = $derived($currentLocale.split('-'));
	const currentLocaleRoot = $derived(currentLocalePaths[0]);
	$effect(() => {
		console.log('currentLocaleRoot', currentLocaleRoot);
	});
</script>

<select bind:value={$currentLocale}>
	{#each $locales as locale}
		<option value={locale} selected={console.log('locccc', locale) && currentLocaleRoot === locale}
			>{locale}</option
		>
	{/each}
</select>
