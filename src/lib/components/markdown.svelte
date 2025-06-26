<script>
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';

	const { markdown } = $props();
	const content = $derived(marked.parse(markdown));
  const clean = $derived(DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "p",
      "a",
      'b',
      "i",
      "ul", "ol", "li",
      "h1", "h2", "h3", "h4", "h5", "h6",
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|tel|sms):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  }));
</script>

<article class="Markdown">
	{@html clean}
</article>

<style>
  .Markdown {
    padding: var(--s);
    :global(ul, ol) {
      margin: 0.5rem 1.5rem;
      padding: 0;
    }
  }
</style>
