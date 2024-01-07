<script lang="ts">
	import { media } from '$lib/api';
	import type { MovieDetails } from '$lib/types';

	export let movie: MovieDetails;

	$: images = movie.images;
	$: backdrop = images.backdrops.find((image) => !image.iso_639_1) || movie.images.backdrops[0];
	$: logo = images.logos.find((image) => image.iso_639_1 === 'en') || movie.images.logos[0];
</script>

<a href={`/movies/${movie.id}`} class="flex max-h-[45rem]">
	<img
		class={`aspect-[${backdrop.aspect_ratio}] w-full object-fill`}
		src={media(backdrop.file_path, 1280)}
		alt={movie.title}
	/>

	<img
		class={`aspect-[${logo.aspect_ratio}] absolute top-0 left-4 w-1/3 h-full drop-shadow-2xl object-contain`}
		src={media(logo.file_path, 1280)}
		alt={movie.title}
	/>
</a>
