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
    display: inline-block;
    padding: calc(var(--s) * 2);
    border: 1px solid var(--c-border);
    transition: border-color ease-in-out 200ms;
    &:hover {
      border-color: var(--c-fg);
    }
  }
</style>
