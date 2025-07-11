<script>
	import Anchor from '$lib/components/anchor.svelte';
	import Card from '$lib/components/card.svelte';
	import { IconBudgetAlt } from 'obra-icons-svelte';

	const { expense = {} } = $props();
	const { id, name } = expense;
</script>

<Card>
	<Anchor href={`/expenses/${id}`}>
		<IconBudgetAlt />
		{name}
	</Anchor>
</Card>
