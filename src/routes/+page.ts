import * as api from '$lib/api';
import type { MovieDetails, MovieList } from '$lib/types.js';

export async function load({ fetch }) {
	const [trendingResponse, nowPlayingResponse, upcomingResponse] = await Promise.all([
		api.get(fetch, 'trending/movie/day'),
		api.get(fetch, 'movie/now_playing'),
		api.get(fetch, 'movie/upcoming')
	]);

	const { results: trendingMovies } = trendingResponse as MovieList;
	const { results: nowPlayingMovies } = nowPlayingResponse as MovieList;
	const { results: upcomingMovies } = upcomingResponse as MovieList;

	const featuredMovieId = trendingMovies[0].id;
	const featured = (await api.get(fetch, `/movie/${featuredMovieId}`, {
		append_to_response: 'images,videos,recommendations'
	})) as MovieDetails;

	return {
		trending: trendingMovies.slice(1),
		nowPlaying: nowPlayingMovies,
		upcoming: upcomingMovies,
		featured
	};
}
