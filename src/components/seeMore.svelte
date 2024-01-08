<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { media } from '$lib/api';
	import type { MovieListResult } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let movies: MovieListResult[];

	const dispatch = createEventDispatcher();

	let viewport: HTMLDivElement;
	let content: HTMLDivElement;
	let itemWidth: number;
	let itemHeight: number;
	let numColumns: number;

	let firstVisibleIndex = 0;
	let lastVisibleIndex = movies.length;
	let paddingTop = 0;
	let paddingBottom = 0;

	function calculateDimensions() {
		const firstItem = content.firstChild as HTMLAnchorElement;
		itemWidth = firstItem.offsetWidth;
		itemHeight = firstItem.offsetHeight;
		numColumns = getComputedStyle(content).gridTemplateColumns.split(' ').length;
		handleScroll();
	}

	function updateScrollPadding() {
		paddingTop = Math.floor(firstVisibleIndex / numColumns) * itemHeight;
		paddingBottom = Math.floor((movies.length - lastVisibleIndex) / numColumns) * itemHeight;
	}

	function handleScroll() {
		const { scrollHeight, scrollTop, clientHeight } = viewport;
		const remainingScroll = scrollHeight - (scrollTop + clientHeight);

		if (remainingScroll < 600) {
			dispatch('end');
		}

		firstVisibleIndex = Math.floor(scrollTop / itemHeight) * numColumns;
		lastVisibleIndex = Math.ceil((scrollTop + clientHeight) / itemHeight) * numColumns;

		updateScrollPadding();
	}

	afterNavigate(() => {
		viewport.scrollTo(0, 0);
	});

	$: if (content) {
		calculateDimensions();
	}
</script>

<svelte:window on:resize={calculateDimensions} />

<div bind:this={viewport} class="h-[calc(100svh-12rem)] overflow-y-auto" on:scroll={handleScroll}>
	<div
		bind:this={content}
		style:padding-top="{paddingTop}px"
		style:padding-bottom="{paddingBottom}px"
		class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"
	>
		{#each movies.slice(firstVisibleIndex, lastVisibleIndex) as movie}
			<a href={`/movies/${movie.id}`}>
				{#if movie.poster_path}
					<img class="aspect-[1/2]" src={media(movie.poster_path, 500)} alt={movie.title} />
				{:else}
					<span>{movie.title}</span>
				{/if}
			</a>
		{/each}
	</div>
</div>
