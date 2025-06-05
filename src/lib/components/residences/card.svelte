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
    display: block;
    padding: calc(var(--s) * 2);
    background-color: var(--c-bg--secondary);
    border: 1px solid var(--c-border);
    border-radius: var(--border-radius);
    text-decoration-color: transparent;
    outline: 1px solid transparent;
    transition: all ease-in-out 200ms;
    &:hover {
      border-color: var(--c-bg--secondary);
      text-decoration-color: inherit;
      background-color: transparent;
      outline-color: var(--c-bg--secondary);
    }
    &:focus {
      outline-color: var(--c-fg);
    }
    &:active {
      outline-color: var(--c-border);
    }
  }
</style>
