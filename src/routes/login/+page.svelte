<script>
	import { _ } from 'svelte-i18n';
  import Login from "$lib/components/login.svelte";
</script>

<svelte:head>
	<title>{$_('menu.login')}</title>
</svelte:head>

<h1>
	{$_('menu.login')}
</h1>

<Login/>

