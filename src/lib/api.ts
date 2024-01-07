import { browser } from '$app/environment';
import { error, type NumericRange } from '@sveltejs/kit';

export const apiBase = 'https://api.movies.tastejs.com';
export const imageBase = 'https://image.tmdb.org/t/p';

const cache = new Map();

export async function get(
	fetch: typeof globalThis.fetch,
	endpoint: string,
	params?: Record<string, string>
) {
	const queryString = new URLSearchParams(params).toString();
	const url = `${apiBase}/${endpoint}?${queryString}`;

	if (cache.has(url)) {
		return cache.get(url);
	}

	const response = await fetch(url);
	if (!response.ok) {
		throw error(response.status as NumericRange<400, 599>);
	}

	const data = await response.json();

	if (browser) {
		cache.set(url, data);
	}

	return data;
}

export function media(filePath: string, width: number) {
	return `${imageBase}/w${width}${filePath}`;
}
