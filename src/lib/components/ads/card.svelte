<script lang="javascript">
	import Card from '$lib/components/card.svelte';
	import Anchor from '$lib/components/anchor.svelte';

  const {ad} = $props();
  const {id, adDescription} = ad
</script>

<Card>
	<Anchor href={`/ads/${id}`}>
		{id} — {adDescription}
	</Anchor>
</Card>
