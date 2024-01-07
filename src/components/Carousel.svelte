<script lang="ts">
	import { media } from '$lib/api';
	import type { MovieListResult } from '$lib/types';
	import Carousel from 'svelte-carousel';

	export let movies: MovieListResult[];
	export let title: string;
	export let seeMoreHref: string | null;
</script>

<h2 class="py-6 text-3xl">
	{title}
	{#if seeMoreHref}
		<a href={seeMoreHref}>see all</a>
	{/if}
</h2>

<Carousel autoplay pauseOnFocus arrows={false} autoplayDuration={5000} dots={false} particlesToShow={8}>
	{#each movies as movie (movie.id)}
		<a href={`/movies/${movie.id}`} class="pl-4">
			<img src={media(movie.poster_path, 500)} alt={movie.title} />
		</a>
	{/each}
</Carousel>

<style lang="pcss">
	:global(.sc-carousel__pages-container) {
		margin-left: -1rem;
	}
</style>
