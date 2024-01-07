<script lang="ts">
	import SeeMore from '$components/seeMore.svelte';

	export let data;
</script>

<h2 class="capitalize text-4xl py-6">{data.title}</h2>
<SeeMore movies={data.movies} />
