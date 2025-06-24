<script>
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';

	const { markdown } = $props();
	const content = $derived(marked.parse(markdown));
  const clean = $derived(DOMPurify.sanitize(content));
  console.log("clean", clean)
</script>

<article class="Markdown">
	{@html clean}
</article>
