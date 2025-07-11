<script>
	import Anchor from '$lib/components/anchor.svelte';
	import Card from '$lib/components/card.svelte';
	import { IconBusinessAlt } from 'obra-icons-svelte';

	const { society = {} } = $props();
	const { id, name } = society;
</script>

<Card>
	<Anchor href={`/societies/${id}`}>
		<IconBusinessAlt />
		{name || id}
	</Anchor>
</Card>
