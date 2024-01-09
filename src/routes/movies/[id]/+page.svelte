<script lang="ts">
	import Hero from '$components/Hero.svelte';
	import Stars from '$components/Stars.svelte';

	export let data;
</script>

<!-- <div class="flex max-lg:flex-col-reverse items-center gap-12 py-12"> -->
<div class="py-16">
	<div
		class="max-w-xl absolute inset-0 flex flex-col justify-center z-10 bg-gradient-to-br from-black/90 to-black/30 h-full shadow-2xl rounded p-2"
	>
		<h1 class="text-5xl lg:text-4xl xl:text-5xl filter-text">{data.title}</h1>
		<h2 class="text-2xl lg:text-xl xl:text-2xl mb-1 filter-text">{data.movie.tagline}</h2>
		<div class="mb-3">
			<Stars vote_average={data.movie.vote_average} vote_count={data.movie.vote_count} />
		</div>
		<p class="text-lg lg:text-base xl:text-lg filter-text text-gray-50">{data.movie.overview}</p>
	</div>
	<Hero movie={data.movie} showLogo={false} />
</div>

<div class="grid gap-12 xl:grid-cols-[1fr_max-content] items-center max-w-5xl mx-auto">
	{#if data.trailer}
		<iframe
			src="https://www.youtube.com/embed/{data.trailer.key}"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
			class="aspect-video w-full"
		/>
	{/if}

	<dl class="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-3">
		<dt>Released</dt>
		<dd>{data.movie.release_date}</dd>

		<dt>Runtime</dt>
		<dd>{data.movie.runtime} minutes</dd>

		<dt>Budget</dt>
		<dd>${Math.round(data.movie.budget / 1e6)}M</dd>

		<dt>Revenue</dt>
		<dd>${Math.round(data.movie.revenue / 1e6)}M</dd>

		<dt>Genre</dt>
		<dd class="genres">{data.movie.genres?.map((g) => g.name).join(', ')}</dd>
	</dl>
</div>

<style>
	dt,
	dd {
		line-height: 1;
		font-size: 1.5rem;
	}

	dt {
		text-transform: uppercase;
		font-size: 1.4rem;
		top: 0.2rem;
		opacity: 0.8;
	}

	dd {
		margin: 0;
	}
	.filter-text {
		filter: drop-shadow(0 0 3rem black) drop-shadow(0 0 0.5rem black);
	}
</style>
