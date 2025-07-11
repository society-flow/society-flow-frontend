<script>
	import { _ } from 'svelte-i18n';
	import Detail from '$lib/components/detail.svelte';
	import Markdown from '$lib/components/markdown.svelte';

	const { advert } = $props();
	const markdown = $derived(advert?.adDescription || '');
</script>

<Detail>
	<Markdown {markdown} />
</Detail>
