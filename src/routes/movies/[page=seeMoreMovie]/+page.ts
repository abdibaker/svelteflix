import * as api from '$lib/api';

type Page = 'trending' | 'now_playing' | 'upcoming';

export async function load({ params, url, fetch }) {
	const title = params.page as Page;
	const page = url.searchParams.get('page') ?? '1';

	const urlMap = {
		trending: 'trending/movie/day',
		now_playing: 'movie/now_playing',
		upcoming: 'movie/upcoming'
	};

	const endpoint = urlMap[title];
	const response = await api.get(fetch, endpoint, { page });

	return {
		title: title.replace('_', ' '),
		endpoint,
		movies: response.results
		// nexPage:
	};
}
