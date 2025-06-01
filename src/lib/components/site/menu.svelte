<script>
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
</script>

<menu>
	<li>
		<a href="{base}/">{$_('menu.home')}</a>
	</li>
	<li>
		<a href="{base}/expenses">{$_('menu.expenses')}</a>
	</li>
	<li>
		<a href="{base}/adverts">{$_('menu.adverts')}</a>
	</li>
	<li>
		<a href="{base}/login">{$_('menu.login')}</a>
	</li>
</menu>
