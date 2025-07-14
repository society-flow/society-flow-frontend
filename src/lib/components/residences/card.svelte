<script lang="javascript">
	import Anchor from '$lib/components/anchor.svelte';
	import Card from '$lib/components/card.svelte';
	import { IconBusiness, IconOrangeSlice, IconGrid, IconUser, IconLayers } from 'obra-icons-svelte';

	const { residence = {} } = $props();
	const { id, residenceName, percentageOwnership, areaValue, floorCount, residentsCount } =
		residence;
	$inspect(residence);
</script>

<Card>
	<Anchor href={`/residences/${id}`}>
		<div>
			<i>
				<IconBusiness />
				<strong>{residenceName || id}</strong>
			</i>
			<i>
				<IconOrangeSlice />
				{percentageOwnership}%
			</i>
			<i>
				<IconGrid />
				{areaValue}
			</i>
			<i>
				<IconUser />
				{residentsCount}
			</i>
			<i>
				<IconLayers />
				{floorCount}
			</i>
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
