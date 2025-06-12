<script>
	import { _ } from 'svelte-i18n';
	import SocietyCard from './card.svelte';
	const { societies = [] } = $props();
</script>

{#if societies.length}
	<ul class="List">
		{#each societies as society}
			<li class="List-item">
				<SocietyCard {society} />
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-center">ø {$_('menu.societies')}</p>
{/if}
