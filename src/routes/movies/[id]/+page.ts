import * as api from '$lib/api';
import type { MovieDetails, Video } from '$lib/types.js';

export async function load({ params, fetch }) {
	let movie;

	movie = (await api.get(fetch, `/movie/${params.id}`, {
		append_to_response: 'images,videos,recommendations'
	})) as MovieDetails;

	const trailer = findOfficialTrailer(movie?.videos?.results);

	return {
		// inWatchList: data.inWatchList,
		movie,
		trailer,
		title: movie?.title
	};
}

function findOfficialTrailer(videos: Video[]) {
	return videos?.find(
		(video) =>
			video.official &&
			video.site === 'YouTube' &&
			(video.type === 'Trailer' || video.type === 'Teaser')
	);
}
