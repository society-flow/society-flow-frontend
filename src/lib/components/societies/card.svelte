<script>
	import Anchor from '$lib/components/anchor.svelte';
	import Card from '$lib/components/card.svelte';

	const { society = {} } = $props();
	const { id, name } = society;
</script>

<Card>
	<Anchor href={`/societies/${id}`}>
		{name}
	</Anchor>
</Card>
