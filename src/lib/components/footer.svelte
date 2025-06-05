<script lang="javascript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import Locales from '$lib/components/locales.svelte';

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
		<a href="{base}/" title={$_('title')}>
			{$_('title')}
		</a>
	</li>
	<li>
		<a href="{base}/settings" title={$_('menu.settings')}>
			{$_('menu.settings')}
		</a>
	</li>
	{#if isAuth}
		<li>
			<a href="{base}/about" title={$_('menu.about')}>
				{$_('menu.about')}
			</a>
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
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		text-align: center;
	}
	time {
		margin: calc(var(--s) / 2);
	}
	a {
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
		padding: calc(var(--s) / 3);
		background-color: transparent;
	}
</style>
