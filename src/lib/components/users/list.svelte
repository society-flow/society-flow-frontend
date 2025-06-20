<script lang="javascript">
   import UserCard from '$lib/components/users/card.svelte';
   import { _ } from 'svelte-i18n';

   // Optional callback: onRemoveUser(user)
   const { users = [], onRemoveUser } = $props();
</script>

{#if users.length > 0}
   <ul class="List">
       {#each users as user}
           <li class="List-item">
               <div class="List-content">
                   <UserCard {user} />
               </div>
               {#if onRemoveUser}
                   <button type="button" data-type="error" on:click={() => onRemoveUser(user)}>
                       {$_('common.delete')}
                   </button>
               {/if}
           </li>
       {/each}
   </ul>
{:else}
   <p class="text-center">{$_('components.users.list.no_user')}</p>
{/if}
