<script>
	import { _ } from 'svelte-i18n';
</script>

<menu>
	<li>
		<a href="/">{$_('menu.home')}</a>
	</li>
	<li>
		<a href="/expenses">{$_('menu.expenses')}</a>
	</li>
	<li>
		<a href="/adverts">{$_('menu.adverts')}</a>
	</li>
	<li>
		<a href="/login">{$_('menu.login')}</a>
	</li>
</menu>
