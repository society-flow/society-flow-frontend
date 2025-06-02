<script>
	import { base } from '$app/paths';
	const { residence = {} } = $props();
  const {id, name} = residence
</script>

<a href={`${base}/residences/${id}`}>
	{name}
</a>

<style>
  a {
    display: inline-block;
    padding: var(--s);
    border: 1px solid var(--c-border);
    transition: border-color ease-in-out 200ms;
    &:hover {
      border-color: var(--c-fg);
    }
  }
</style>
