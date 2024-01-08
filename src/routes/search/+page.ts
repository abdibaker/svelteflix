import * as api from '$lib/api';
import type { MovieList } from '$lib/types.js';

export async function load({ url, fetch }) {
	const query = url.searchParams.get('query');

	if (!query) {
		return {
			query,
			movies: [],
			nextPage: null,
			infinite: true
		};
	}

	const data = (await api.get(fetch, 'search/movie', { query })) as MovieList;

	const nextPage = data.page < data.total_pages ? data.page + 1 : null;

	return {
		query,
		movies: data.results,
		nextPage,
		infinite: true
	};
}
