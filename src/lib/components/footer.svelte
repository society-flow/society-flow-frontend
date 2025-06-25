<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import Locales from '$lib/components/locales.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	const isAuth = $derived(userState.isAuth);
	const currentDateTime = new Date();
	const currentYear = currentDateTime.getFullYear();
</script>

<menu>
	<li>
		©
		<time datetime={currentDateTime.toISOString()} title={currentDateTime.toLocaleString()}>
			{currentYear}
		</time>
	</li>
	<li>
		<Anchor href="/" title={$_('title')}>
			{$_('title')}
		</Anchor>
	</li>
	<li>
		<Anchor href="/legal" title={$_('menu.legal')}>
			{$_('menu.legal')}
		</Anchor>
	</li>
	<li>
		<Anchor href="/settings" title={$_('menu.settings')}>
			{$_('menu.settings')}
		</Anchor>
	</li>
	{#if isAuth}
		<li>
			<Anchor href="/about" title={$_('menu.about')}>
				{$_('menu.about')}
			</Anchor>
		</li>
	{/if}
	<li>
		<Locales />
	</li>
</menu>

<style>
	menu {
		padding: 0;
		margin: 0;
		list-style: none;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.3rem;
		:global(a) {
			padding: calc(var(--s) / 2) var(--s);
			color: var(--c-fg);
			font-weight: bold;
			display: inline-block;
			text-decoration: underline;
			text-decoration-color: transparent;
			transition: all ease-in-out 200ms;
			line-height: 1;
			&:hover {
				text-decoration-color: var(--c-link);
			}
		}
		:global(select) {
			padding: calc(var(--s) / 3) var(--s);
			background-color: transparent;
		}
		time {
			margin: calc(var(--s) / 2);
		}
	}
</style>
