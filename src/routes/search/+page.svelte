<script lang="ts">
	import SeeMore from '$components/seeMore.svelte';

	export let data;
</script>

<h1>Search</h1>

<form class='mb-4'>
	<input
		class="p-3 text-xl w-full bg-slate-600/50 border-none rounded text-white focus:outline-red-600"
		name="query"
		value={data.query}
		autocomplete="off"
		spellcheck="false"
	/>
</form>

{#if data.query}
	{#key data.query}
		<SeeMore movies={data.movies} next={null} />
	{/key}
{/if}

<style>
	input:focus-visible {
		outline: 2px solid #dc2626;
	}
</style>
