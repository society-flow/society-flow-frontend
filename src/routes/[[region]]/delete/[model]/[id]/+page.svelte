<script lang="javascript">
   import { _, locale } from 'svelte-i18n';
   import { page } from '$app/stores';
   import { base } from '$app/paths';
   import { goto } from '$app/navigation';
   import { api } from '$lib/api.svelte.js';
   import requiresAuth from '$lib/effects/requires-auth.svelte.js';
   import Page from '$lib/components/routes/page.svelte';
   import Anchor from '$lib/components/anchor.svelte';

   requiresAuth(locale);

   const model = $derived($page.params.model);
   const id = $derived($page.params.id);

   let item = $state({});
   let error = $state('');
   let isDeleting = $state(false);

   $effect(async () => {
       if (model && id) {
           try {
               if (model === 'ads') {
                   item = await api.getAdvertisementById(id);
               } else if (model === 'residences') {
                   item = await api.getResidenceById(id);
               } else if (model === 'societies') {
                   item = await api.getSocietyById(id);
               } else {
                   error = `Unsupported model: ${model}`;
               }
           } catch (e) {
               error = e.message || e;
           }
       }
   });

   async function handleDelete() {
       isDeleting = true;
       error = '';
       try {
           if (model === 'ads') {
               await api.updateAdvertisement(id, { ...item, isActive: false });
           } else if (model === 'residences') {
               await api.createOrUpdateResidence({ ...item, isActive: false });
           } else if (model === 'societies') {
               await api.createOrUpdateSociety({ ...item }); // no isActive flag for societies
           }
           setTimeout(() => goto(`${base}/${$locale}/${model}`), 0);
       } catch (e) {
           error = e.message || e;
       } finally {
           isDeleting = false;
       }
   }
</script>

<Page title={`Delete ${model.slice(0, -1)}`}>
   {#if error}
       <p class="error">{error}</p>
   {:else if !item.id}
       <progress></progress>
   {:else}
       <p>Are you sure you want to delete "{item.name || item.title || item.residenceName}"?</p>
       <fieldset>
           <button on:click={handleDelete} disabled={isDeleting}>
               {isDeleting ? $_('common.deleting') : $_('common.delete')}
           </button>
           <Anchor href={`${base}/${$locale}/${model}`}>{$_('common.cancel') || 'Cancel'}</Anchor>
       </fieldset>
   {/if}
</Page>
