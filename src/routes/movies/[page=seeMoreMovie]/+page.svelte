<script lang="ts">
	import SeeMore from '$components/seeMore.svelte';
	import * as api from '$lib/api';

	export let data;

	let appending = false;

	async function handleEnd() {
		if (!data.nextPage || appending) return;
		appending = true;
		try {
			const next = await api.get(fetch, data.endpoint, {
				page: String(data.nextPage)
			});

			data.movies = [...data.movies, ...next.results];
			data.nextPage = next.page < next.total_pages ? next.page + 1 : null;
		} finally {
			appending = false;
		}
	}
</script>

<h2 class="capitalize text-4xl py-6">{data.title}</h2>

<SeeMore movies={data.movies} on:end={handleEnd} />
