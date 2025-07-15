<script>
	import { _, locale } from 'svelte-i18n';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';
	import ListSocieties from '$lib/components/societies/list.svelte';
	import Icon from '$lib/components/icon.svelte';

	requiresAuth(locale);

	const { data } = $props();
	const { societies } = $derived(data);
</script>

<Page title={$_('menu.societies')}>
	{#snippet header()}
		<h1>
			{$_('menu.societies')}
		</h1>
	{/snippet}

	<section>
		<header>
			<nav>
				<ul>
					<li>
						<Anchor href="/create/societies" title={$_('menu.create.societies')} isButton>
							<Icon icon="add" />
						</Anchor>
					</li>
				</ul>
			</nav>
		</header>
		<ListSocieties {societies} />
	</section>
</Page>
