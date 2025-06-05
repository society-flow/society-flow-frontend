<script lang="javascript">
	import { _, json } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Register from '$lib/components/auth/register.svelte';
	import requiresNoAuth from '$lib/effects/requires-no-auth.svelte.js';

	requiresNoAuth();

	const email = page.url.searchParams.get('email');
	const name = page.url.searchParams.get('name');

	const sections = $derived($json('pages.auth.register.sections'));

	async function onregister({ email: userEmail }) {
		console.log('onregister');
		setTimeout(() => goto(`${base}/auth/verify-otp?email=${userEmail}`), 0);
	}
</script>

<svelte:head>
	<title>{$_('menu.register')}</title>
</svelte:head>

<header>
	<h1>{$_('menu.register')}</h1>
</header>

{#if !userState.isAuth}
	<section>
		<Register {onregister} {email} {name} />
	</section>
	{#each Object.entries(sections) as [key, section]}
		<section>
			<p>
				{section.text}
				{#if section.link}
					<a href={section.link.url}>{$_(section.link.text)}</a>
				{/if}
				{'.'}
			</p>
		</section>
	{/each}
{/if}

<style>
	p {
		text-align: center;
	}
</style>
