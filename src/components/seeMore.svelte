<script lang="ts">
	import { media } from '$lib/api';
	import type { MovieListResult } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';

	export let movies: MovieListResult[];

	const dispatch = createEventDispatcher();

	let viewport: HTMLDivElement;
	let content: HTMLDivElement;
	let itemWidth: number;
	let itemHeight: number;
	let numColumns: 2;

	let firstVisibleIndex = 0;
	let lastVisibleIndex = movies.length;
	let paddingTop = 0;
	let paddingBottom = 0;

	function handleResize() {
		const firstItem = content.firstChild as HTMLAnchorElement;

		itemWidth = firstItem.offsetWidth;
		itemHeight = firstItem.offsetHeight;
		numColumns = 2;

		handleScroll();
	}

	function handleScroll() {
		const { scrollHeight, scrollTop, clientHeight } = viewport;

		const remainingScroll = scrollHeight - (scrollTop + clientHeight);

		if (remainingScroll < 400) {
			dispatch('end');
		}

		firstVisibleIndex = Math.floor(scrollTop / itemHeight) * numColumns;
		lastVisibleIndex = Math.ceil((scrollTop + clientHeight) / itemHeight) * numColumns;

		paddingTop = Math.floor(firstVisibleIndex / numColumns) * itemHeight;
		paddingBottom = Math.floor((movies.length - lastVisibleIndex) / numColumns) * itemHeight;
	}

	onMount(handleResize);
</script>

<svelte:window on:resize={handleResize} />

<p>showing items {firstVisibleIndex} - {lastVisibleIndex}</p>

<div
	bind:this={viewport}
	class="h-[calc(100svh-15rem)] w-[83vw] overflow-y-auto"
	on:scroll={handleScroll}
>
	<div
		bind:this={content}
		style:padding-top="{paddingTop}px"
		style:padding-bottom="{paddingBottom}px"
		class="grid grid-cols-2 gap-4"
	>
		{#each movies.slice(firstVisibleIndex, lastVisibleIndex) as movie (movie.id)}
			<a href={`/movies/${movie.id}`}>
				<img class="aspect-[1/2]" src={media(movie.poster_path, 500)} alt={movie.title} />
			</a>
		{/each}
	</div>
</div>
