import { browser } from '$app/environment';
import { error, type NumericRange } from '@sveltejs/kit';

export const apiBase = 'https://api.movies.tastejs.com';
export const imageBase = 'https://image.tmdb.org/t/p';

const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 5;

function clearOldCacheEntries() {
	const now = Date.now();
	cache.forEach((value, key) => {
		if (now - value.timestamp > CACHE_DURATION) {
			cache.delete(key);
		}
	});
}
export async function get(
	fetch: typeof globalThis.fetch,
	endpoint: string,
	params?: Record<string, string>
) {
	clearOldCacheEntries();

	const queryString = new URLSearchParams(params).toString();
	const url = `${apiBase}/${endpoint}?${queryString}`;

	if (cache.has(url)) {
		return cache.get(url).data;
	}

	const response = await fetch(url);
	if (!response.ok) {
		throw error(response.status as NumericRange<400, 599>);
	}

	const data = await response.json();

	if (browser) {
		cache.set(url, { data, timestamp: Date.now() });
	}

	return data;
}

export function media(filePath: string, width: number) {
	return `${imageBase}/w${width}${filePath}`;
}
