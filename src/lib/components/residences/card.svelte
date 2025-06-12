<script lang="javascript">
	import Anchor from '$lib/components/anchor.svelte';
	import Card from '$lib/components/card.svelte';

	const { residence = {} } = $props();
	const { id, residenceName } = residence;
</script>

<Card>
	<Anchor href={`/residences/${id}`}>
		{residenceName || id}
	</Anchor>
</Card>
