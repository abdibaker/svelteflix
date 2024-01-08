<script lang="ts">
	import Hero from '$components/Hero.svelte';

	export let data;
</script>

<div class="flex max-lg:flex-col-reverse items-center gap-12 py-12">
	<div class="basis-[50rem]">
		<h1 class="text-5xl lg:text-4xl xl:text-5xl">{data.title}</h1>
		<h2 class="text-2xl lg:text-xl xl:text-2xl mb-3">{data.movie.tagline}</h2>
		<p class="text-lg lg:text-base xl:text-lg">{data.movie.overview}</p>
	</div>
	<Hero movie={data.movie} showLogo={false} />
</div>
