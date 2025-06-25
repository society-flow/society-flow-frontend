<script>
  import { _, locale } from 'svelte-i18n';
  import { page } from '$app/stores';
  import { api } from '$lib/api.svelte.js';
  import requiresAuth from '$lib/effects/requires-auth.svelte.js';
  import Anchor from '$lib/components/anchor.svelte';
  import AdsList from '$lib/components/ads/list.svelte';

  requiresAuth(locale);

  const id = $derived($page.params.id);

  let ads = $state([]);
  $effect(async () => {
    if (id) {
      ads = await api.getAdvertisementsBySocietyId(id);
    }
  });
</script>

<section>
  <header>
    <h2>{$_('menu.ads')}</h2>
    <nav>
      <Anchor href={`/create/ads?society=${id}`} isButton>
        {$_('menu.create.ads')}
      </Anchor>
    </nav>
  </header>
  <AdsList {ads} />
</section>
