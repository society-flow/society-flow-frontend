<script lang="javascript">
	import ResidenceDetails from '$lib/components/residences/details.svelte';
	import SocietyCard from '$lib/components/societies/card.svelte';

	const { data } = $props();
	const { residence, isMember, society } = data;
</script>

<ResidenceDetails {residence} {isMember} {society} />

<!-- <aside> -->
<!-- 	<SocietyCard {society} /> -->
<!-- </aside> -->
