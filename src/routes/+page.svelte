<script lang="ts">
	import Carousel from '$components/Carousel.svelte';
	import Hero from '$components/Hero.svelte';

	export let data;
</script>

<h1 class="my-6 text-4xl">Top Trending Movies</h1>

<Hero movie={data.featured} />

<Carousel title="Trending" seeMoreHref="" movies={data.trending} />
<Carousel title="Now playing" seeMoreHref="" movies={data.nowPlaying} />
<Carousel title="Upcoming"  movies={data.upcoming} />
