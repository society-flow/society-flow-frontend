<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { api } from '$lib/api.svelte.js';
	import requiresAuth from '$lib/effects/requires-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
   import ListExpenses from '$lib/components/expenses/list.svelte';
   import Anchor from '$lib/components/anchor.svelte';

	requiresAuth($locale);

   import { userState } from '$lib/states/user.svelte.js';
   let societies = $state([]);
   $effect(async () => {
       if (userState.user?.id) {
           societies = await api.getUserSocieties(userState.user.id);
       }
   });

   let dicExpenses = $state({});
   $effect(async () => {
       if (societies.length > 0) {
           const results = await Promise.all(
               societies.map(soc => api.getAllExpensesBySociety(soc.id))
           );
           const map = {};
           societies.forEach((soc, idx) => {
               map[soc.id] = results[idx];
           });
           dicExpenses = map;
       }
   });
</script>

<Page title={$_('menu.expenses')}>
   {#snippet header()}
       <h1>{$_('menu.expenses')}</h1>
       <Anchor href="/create/expenses" isButton>{$_('menu.create.expenses')}</Anchor>
   {/snippet}
   {#each societies as society}
       <section>
           <h2><Anchor href={`/societies/${society.id}`}>{society.name}</Anchor></h2>
           <ListExpenses expenses={dicExpenses[society.id] || []} />
       </section>
   {:else}
       <p>No societies found.</p>
   {/each}
</Page>
