<script lang="javascript">
	import { page } from '$app/stores';
	const slug = $derived($page.params.slug);
	import Document from '$lib/components/legal/document.svelte';
</script>

<Document {slug} />
