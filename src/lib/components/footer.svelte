<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';

	const isAuth = $derived(userState.isAuth);
</script>

<menu>
	<li>
		{new Date().getFullYear()} ©
	</li>
	<li>
		<a href="{base}/">
			{$_('title')}
		</a>
	</li>
	{#if isAuth}
		<li>
			<a href="{base}/about">
				{$_('menu.about')}
			</a>
		</li>
	{/if}
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
			border-radius: calc(var(--s) * 1.5);
			text-decoration-color: var(--c-link);
		}
	}
</style>
