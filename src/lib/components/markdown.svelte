<script>
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';

	const { markdown } = $props();
	const clean = $derived(markdown ? DOMPurify.sanitize(markdown) : '');
	const content = $derived(clean ? marked.parse(clean) : '');
</script>

<article class="Markdown">
	{@html content ?? null}
</article>
