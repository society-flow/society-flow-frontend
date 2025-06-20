<script lang="javascript">
   import Card from '$lib/components/card.svelte';
   import Anchor from '$lib/components/anchor.svelte';

	const { ad } = $props();
	const { id, adDescription, adTitle } = ad;
</script>

<Card>
	<Anchor href={`/ads/${id}`}>
		{#if adTitle}
			<strong>
				{adTitle}
			</strong>
		{/if}
		<span>
			{adDescription.slice(0, 100) + '…'}
		</span>
	</Anchor>
</Card>

<style>
	span {
		color: var(--c-fg);
	}
</style>
