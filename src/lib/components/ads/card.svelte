<script>
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';
	import Anchor from '$lib/components/anchor.svelte';
	import Icon from '$lib/components/icon.svelte';
	import Card from '$lib/components/card.svelte';

	const { ad } = $props();
	const content = $derived(marked.parse(ad?.adDescription));
	const description = $derived(
		DOMPurify.sanitize(content, {
			ALLOWED_TAGS: []
		})
	);
</script>

<Card>
	<Anchor href={`/ads/${ad.id}`}>
		<Icon icon="world" />
		{#if ad.title}
			{ad.title}
		{/if}
		<span>
			{description.slice(0, 100) + '…'}
		</span>
	</Anchor>
</Card>

<style>
	span {
		color: var(--c-fg);
	}
</style>
