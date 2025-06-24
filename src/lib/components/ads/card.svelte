<script lang="javascript">
	import Card from '$lib/components/card.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	const { ad } = $props();
</script>

<Card>
	<Anchor href={`/ads/${ad.id}`}>
		{#if ad.title}
			{ad.title}
		{/if}
		<span>
			{ad.adDescription.slice(0, 100) + '…'}
		</span>
	</Anchor>
</Card>

<style>
	span {
		color: var(--c-fg);
	}
</style>
