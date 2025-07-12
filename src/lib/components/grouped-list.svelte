<script>
	const {
		items = [],
		groupBy = (item) => item.yearMonth,
		sortGroups = (a, b) => parseInt(b) - parseInt(a),
		sortGroupItems = null,
		children,
		groupHeader = null
	} = $props();

	let groupedItems = $state({});
	let sortedGroupKeys = $state([]);

	$effect(() => {
		if (!items || items.length === 0) {
			groupedItems = {};
			sortedGroupKeys = [];
			return;
		}

		const grouped = items.reduce((acc, item) => {
			const key = groupBy(item);
			if (!acc[key]) acc[key] = [];
			acc[key].push(item);
			return acc;
		}, {});

		// Sort items within each group
		if (sortGroupItems) {
			Object.values(grouped).forEach((group) => group.sort(sortGroupItems));
		}

		groupedItems = grouped;
		sortedGroupKeys = Object.keys(grouped).sort(sortGroups);
	});
</script>

{#if sortedGroupKeys.length > 0}
	{#each sortedGroupKeys as groupKey}
		{@const itemsInGroup = groupedItems[groupKey]}
		<details class="GroupedList-group">
			{#if groupHeader}
				<summary class="GroupedList-header">
					{@render groupHeader(groupKey, itemsInGroup)}
				</summary>
			{/if}
			<section>
				<ul class="GroupedList-items">
					{@render children(groupKey, itemsInGroup)}
				</ul>
			</section>
		</details>
	{/each}
{:else}
	<p>ø</p>
{/if}

<style>
	.GroupedList-items {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
