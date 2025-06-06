<script>
	import Anchor from '$lib/components/anchor.svelte';
	import Card from '$lib/components/card.svelte';

	const { expense = {} } = $props();
	const { id, name } = expense;
</script>

<Card>
	<Anchor href={`/expenses/${id}`}>
		{name}
	</Anchor>
</Card>
