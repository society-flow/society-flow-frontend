<script>
	import Anchor from '$lib/components/anchor.svelte';
	import Card from '$lib/components/card.svelte';
	import Icon from '$lib/components/icon.svelte';

	const { society = {}, ...rest } = $props();
	const { id, name } = society;
</script>

<Card {...rest}>
	<Anchor href={`/societies/${id}`}>
		<Icon icon="business-alt" />
		{name || id}
	</Anchor>
</Card>
