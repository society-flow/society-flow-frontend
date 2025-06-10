<script lang="javascript">
	import { _, json, locale } from 'svelte-i18n';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Login from '$lib/components/auth/login.svelte';
	import requiresNoAuth from '$lib/effects/requires-no-auth.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';

	requiresNoAuth($locale);

	const email = $derived(page.url.searchParams.get('email'));

	const sections = $derived($json('pages.auth.login.sections'));

	async function onLogin({ email: userEmail }) {
		setTimeout(() => goto(`${base}/${$locale}/auth/verify-otp?email=${userEmail}`), 0);
	}
</script>

<Page title={$_('menu.auth.login')}>
	{#snippet header()}
		<h1>
			{$_('menu.auth.login')}
		</h1>
	{/snippet}
	{#if !userState.isAuth}
		<section>
			<Login {onLogin} {email} />
		</section>
	{/if}

	{#if !userState.isAuth}
		<section>
			{#each Object.entries(sections) as [key, section]}
				<article>
					<p class="text-center">
						{section.text}
						{#if section.link}
							<Anchor href={section.link.url}>{$_(section.link.text).toLowerCase()}</Anchor>
						{/if}
						{'.'}
					</p>
				</article>
			{/each}
		</section>
	{/if}
</Page>
