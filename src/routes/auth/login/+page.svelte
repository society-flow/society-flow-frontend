<script lang="javascript">
	import { _, json } from 'svelte-i18n';
	import { userState } from '$lib/states/user.svelte.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import Login from '$lib/components/auth/login.svelte';
	import requiresNoAuth from '$lib/effects/requires-no-auth.svelte.js';

	requiresNoAuth();

	const email = page.url.searchParams.get('email');

	const sections = $derived($json('pages.auth.login.sections'));

	async function onLogin({ email }) {
		setTimeout(() => goto(`${base}/auth/verify-otp?email=${email}`), 0);
	}
</script>

<svelte:head>
	<title>{$_('menu.login')}</title>
</svelte:head>

<header>
	<h1>
		{$_('menu.login')}
	</h1>
</header>

{#if !userState.isAuth}
	<section>
		<Login {onLogin} {email} />
	</section>
{/if}

{#if !userState.isAuth}
	<section>
		{#each Object.entries(sections) as [key, section]}
			<article>
				<p>
					{section.text}
					{#if section.link}
						<a href={section.link.url}>{$_(section.link.text)}</a>
					{/if}
					{'.'}
				</p>
			</article>
		{/each}
	</section>
{/if}

<style>
  p {
    text-align: center;
  }
</style>
