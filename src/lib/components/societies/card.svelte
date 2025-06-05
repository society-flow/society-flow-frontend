<script>
	import { base } from '$app/paths';
	const { society = {} } = $props();
  const { id, name, role } = society
</script>

<a href={`${base}/societies/${id}`}>
	{name} - {role}
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
  }
</style>
