<script>
	import Anchor from '$lib/components/anchor.svelte';
	import Card from '$lib/components/card.svelte';

	const { residence = {} } = $props();
	const { id, name } = residence;
</script>

<Card>
	<Anchor href={`/residences/${id}`}>
		{name}
	</Anchor>
</Card>
