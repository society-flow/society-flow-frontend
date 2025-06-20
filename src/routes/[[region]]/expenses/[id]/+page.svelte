<script lang="javascript">
   import { _, locale } from 'svelte-i18n';
   import { page } from '$app/stores';
   import { api } from '$lib/api.svelte.js';
   import requiresAuth from '$lib/effects/requires-auth.svelte.js';
   import Anchor from '$lib/components/anchor.svelte';
   import Page from '$lib/components/routes/page.svelte';

   requiresAuth(locale);

   const id = $derived($page.params.id);

   let expense = $state({});
   $effect(async () => {
       if (id) {
           expense = await api.getExpenseById(id);
       }
   });

   let society = $state({});
   $effect(async () => {
       if (expense.societyId) {
           society = await api.getSocietyById(expense.societyId);
       }
   });

   let calculations = $state([]);
   $effect(async () => {
       if (id) {
           calculations = await api.getAllCalculationsByExpense(id);
       }
   });
</script>

<Page title={$_('menu.expenses')}>
   <main>
       <p><Anchor href="/expenses">← Back to all expenses</Anchor></p>
       {#if expense.id}
           <h1>{expense.name}</h1>
           <p>Society: <Anchor href={`/societies/${expense.societyId}`}>{society.name || expense.societyId}</Anchor></p>
           <p>Amount per Month: {expense.amountPerMonth}</p>
           <p>Active: {expense.isActive ? 'Yes' : 'No'}</p>
           <p>Created At: {expense.createdAt}</p>
           <p>Updated At: {expense.updatedAt}</p>
           <p><Anchor href={`/update/expenses/${expense.id}`}>Edit Expense</Anchor></p>

           <section>
               <h2>Calculations</h2>
               {#if calculations.length}
                   <table>
                       <thead><tr><th>Month</th><th>Residence</th><th>Amount</th></tr></thead>
                       <tbody>
                       {#each calculations as calc}
                           <tr>
                               <td>{calc.yearMonth}</td>
                               <td>{calc.residenceName}</td>
                               <td>{calc.amount}</td>
                           </tr>
                       {/each}
                       </tbody>
                   </table>
               {:else}
                   <p>No calculations available.</p>
               {/if}
           </section>
       {:else}
           <p>Loading...</p>
       {/if}
   </main>
</Page>
