<script lang="javascript">
   import { _, locale } from 'svelte-i18n';
   import { page } from '$app/stores';
   import { base } from '$app/paths';
   import { goto } from '$app/navigation';
   import { api } from '$lib/api.svelte.js';
   import Error from '$lib/components/error.svelte';
   import Page from '$lib/components/routes/page.svelte';
   import Form from '$lib/components/expenses/form.svelte';

   const id = $derived($page.params.id);
   let data = $state(null);
   let error = $state('');

   $effect(async () => {
       try {
           data = await api.getExpenseById(id);
       } catch (e) {
           error = e;
       }
   });

   function onsuccess(expense) {
       setTimeout(() => goto(`${base}/${$locale}/expenses/${expense.id}`), 0);
   }
</script>

<Page title="Update Expense">
   {#if error}
       <Error {error} />
   {:else if !data}
       <progress />
   {:else}
       <Form data={data} {onsuccess} />
   {/if}
</Page>
