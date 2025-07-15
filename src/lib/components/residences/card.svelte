<script lang="javascript">
	import Anchor from '$lib/components/anchor.svelte';
	import Card from '$lib/components/card.svelte';
	import Icon from '$lib/components/icon.svelte';

	const { residence = {}, ...rest } = $props();
	const { id, residenceName, percentageOwnership, areaValue, floorCount, residentsCount } =
		residence;
</script>

<Card {...rest}>
	<Anchor href={`/residences/${id}`}>
		<div>
			<Icon icon="business">
				<strong>{residenceName || id}</strong>
			</Icon>
			<Icon icon="user">
				{residentsCount}
			</Icon>
			<Icon icon="layers">
				{floorCount}
			</Icon>
			<Icon icon="grid">
				{areaValue}
			</Icon>
			<Icon icon="orange-slice">
				{percentageOwnership}%
			</Icon>
		</div>
	</Anchor>
</Card>

<style>
	div {
		display: grid;
		align-items: center;
		grid-template-columns: repeat(5, 1fr);
		gap: calc(var(--s) * 2);
		flex-grow: 1;
	}
	i {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: calc(var(--s) / 1);
		&:first-of-type {
			justify-content: flex-start;
		}
	}
	strong {
		font-weight: bold;
		white-space: pre;
	}
</style>
