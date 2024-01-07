<script lang="ts">
	import Carousel from '$components/Carousel.svelte';
	import Hero from '$components/Hero.svelte';

	export let data;
</script>

<h1 class="my-6 text-4xl">Today's top movies</h1>

<Hero movie={data.featured} />

<Carousel title="Trending" seeMoreHref="/movies/trending" movies={data.trending} />
<Carousel title="Now playing" seeMoreHref="/movies/now_playing" movies={data.nowPlaying} />
<Carousel title="Upcoming" movies={data.upcoming} seeMoreHref="/movies/upcoming" />
