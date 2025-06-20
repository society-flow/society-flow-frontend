<script lang="javascript">
   import { _, locale } from 'svelte-i18n';
   import { goto } from '$app/navigation';
   import { base } from '$app/paths';
   import requiresAuth from '$lib/effects/requires-auth.svelte.js';
   import Page from '$lib/components/routes/page.svelte';
   import Form from '$lib/components/expenses/form.svelte';

   requiresAuth(locale);

   async function onsuccess({ id }) {
       // Navigate to expense detail after creation
       setTimeout(() => goto(`${base}/${$locale}/expenses/${id}`), 0);
   }
</script>

<Page title={$_('menu.create.expenses')}>
   <Form onsuccess={onsuccess} />
</Page>
