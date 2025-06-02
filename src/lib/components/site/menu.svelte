<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/state';

	const menuItems = [
		{ path: '/', label: 'menu.home' },
		{ path: '/expenses', label: 'menu.expenses' },
		{ path: '/ads', label: 'menu.adverts' },
		{ path: '/login', label: 'menu.login' }
	];
</script>

<menu>
	{#each menuItems as item}
		<li>
			<a href="{base}{item.path}" aria-current={item.path === page.url.pathname ? 'page' : ''}>
				{$_(item.label)}
			</a>
		</li>
	{/each}
</menu>

<style>
	menu {
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
	}
	a {
		padding: var(--s);
		text-decoration: none;
		color: inherit;
    display: inline-block;
		&[aria-current='page'] {
			color: var(--c-link);
		}
	}
</style>
