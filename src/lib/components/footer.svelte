<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
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
</menu>

<style>
	menu {
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;
		overflow-x: scroll;
		align-items: center;
	}
	a {
		padding: calc(var(--s) / 2) var(--s);
		color: var(--c-fg);
		font-weight: bold;
		display: inline-block;
		text-decoration: underline;
		text-decoration-color: transparent;
		transition: all ease-in-out 200ms;
		&:hover {
			border-radius: calc(var(--s) * 1.5);
			text-decoration-color: var(--c-link);
		}
	}
</style>
