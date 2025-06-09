<script lang="javascript">
	import { _, json } from 'svelte-i18n';
	import { DOCUMENT_TYPES } from '$lib/const/legal.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	const { children } = $props();
</script>

<Page title={$_('menu.legal')}>
	{#snippet header()}
		<h1>{$_('menu.legal')}</h1>
		<menu>
			{#each DOCUMENT_TYPES as documentType}
				<li>
					<Anchor href={`/legal/${documentType}`}>
						{$_(`menu.legal.${documentType}`)}
					</Anchor>
				</li>
			{/each}
		</menu>
	{/snippet}

	{@render children?.()}
</Page>
