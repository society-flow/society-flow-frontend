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
	let userEmail = $state(email || '');

	const sections = $derived($json('pages.auth.login.sections'));

	async function onSubmit({ email: inputEmail }) {
		userEmail = inputEmail;
	}
	async function onLogin({ email: inputEmail }) {
       goto(`${base}/${$locale}/auth/verify-otp?email=${inputEmail}`);
	}
</script>

<Page title={$_('menu.auth.login')} isCenter={true}>
	{#if !userState.isAuth}
		<section>
			<Login {onLogin} {onSubmit} {email} />
		</section>
	{/if}

	<section>
		{#if userEmail}
			{@render templateSections()}
		{:else}
			{@render templateSections()}
		{/if}
	</section>
</Page>

{#snippet templateSections()}
	{#each Object.entries(sections) as [key, section]}
		<article>
			<p>
				{section.text}
				{#if section.link}
					<Anchor href={userEmail ? `/auth/register?email=${userEmail}` : '/auth/register'}
						>{$_(section.link.text).toLowerCase()}</Anchor
					>
				{/if}
				{'.'}
			</p>
		</article>
	{/each}
{/snippet}
