<script>
	import { _ } from 'svelte-i18n';
	import Icon from '$lib/components/icon.svelte';
	import Card from '$lib/components/card.svelte';

	let { count } = $props();
</script>

<Card background>
	<div>
		<h4>
			<Icon icon="business" />
			{$_('menu.residences')}
		</h4>
		<span>
			{count}
		</span>
	</div>
</Card>

<style>
	h4,
	div {
		display: flex;
		align-items: center;
		gap: var(--s);
	}
	div {
		background-color: var(--c-bg2);
		border-radius: var(--border-radius);
		padding: var(--s);
	}
</style>
