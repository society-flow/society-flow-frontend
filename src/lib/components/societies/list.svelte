<script>
	import { _ } from 'svelte-i18n';
	import SocietyCard from './card.svelte';
	const { societies = [] } = $props();
</script>

{#if societies.length}
	<ul>
		{#each societies as society}
			<li>
				<SocietyCard {society} />
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-center">ø {$_('menu.societies')}</p>
{/if}

<style>
	ul {
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: var(--s);
		justify-content: center;
	}
</style>
