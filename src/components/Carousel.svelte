<script lang="ts">
	import { smoothLoad } from '$lib/actions';
	import { media } from '$lib/api';
	import type { MovieListResult } from '$lib/types';
	import Carousel from 'svelte-carousel';

	export let movies: MovieListResult[];
	export let title: string;
	export let seeMoreHref = '';
</script>

<h2 class="py-6 text-3xl">
	{title}
	{#if seeMoreHref}
		<a class="text-red-500 hover:text-red-700 text-2xl" href={seeMoreHref}>see all</a>
	{/if}
</h2>

<Carousel
	let:currentPageIndex
	autoplay
	pauseOnFocus
	arrows={false}
	autoplayDuration={5000}
	dots={false}
	particlesToShow={8}
>
	{#each movies as movie, i}
		<a href={`/movies/${movie.id}`} class="pl-4" class:pl-0={currentPageIndex === i}>
			<img
				class="aspect-[1/2]"
				src={media(movie.poster_path, 500)}
				alt={movie.title}
				use:smoothLoad
			/>
		</a>
	{/each}
</Carousel>

<style lang="pcss">
</style>
