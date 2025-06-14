<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import { DOCUMENT_TYPES as validSlugs } from '$lib/const/legal.js';
	import Dpi from '$lib/components/legal/dpi.svelte';

	const { slug } = $props();

	let content = $state('');

	async function loadLegalContent() {
		if (!slug || !validSlugs.includes(slug)) {
			console.error(`Invalid legal document type: ${slug}`);
			return;
		}

		try {
			const response = await api.getLegal(slug, $locale);
			content = response;
		} catch (err) {
			console.info('Error', err);
		}
	}

	$effect(() => {
		loadLegalContent();
	});
</script>

<article>
	{#if validSlugs.includes(slug)}
		<header>
			<h1>{$_(`menu.legal.${slug}`)}</h1>
		</header>
		{#if content && content.message}
			{#if slug === 'data-processing-info'}
				<Dpi dpi={content?.message} />
			{:else if typeof content === 'object'}
				<pre>{content?.message}</pre>
			{/if}
		{/if}
	{/if}
</article>

<style>
	article {
		pre {
			white-space: pre-wrap;
		}
	}
</style>
