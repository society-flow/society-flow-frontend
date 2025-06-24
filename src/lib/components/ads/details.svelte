<script>
	import { _ } from 'svelte-i18n';
	import Anchor from '$lib/components/anchor.svelte';
	import Markdown from '$lib/components/markdown.svelte';

	const { advert } = $props();
	const markdown = $derived(advert?.adDescription || '');
</script>

<main>
	<Markdown {markdown} />
</main>
