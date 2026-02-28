import { API_BASE_URL } from '../constants/api-config';
import { TRACKERS } from '../constants/trackers';
import type { FetchMoviesParams, FetchMoviesResponse } from '../types/movie';

/**
 * Fetches movies from the YTS-compatible API.
 * Constructs query params, calls fetch, and returns the `data` object.
 */
export async function fetchMovies(
    params: FetchMoviesParams
): Promise<FetchMoviesResponse> {
    const url = new URL(API_BASE_URL);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            url.searchParams.set(key, String(value));
        }
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const json = await response.json();

    if (json.status !== 'ok') {
        throw new Error(json.status_message || 'Unknown API error');
    }

    return json.data;
}

/**
 * Constructs a magnet URI from a torrent hash and movie title.
 * Appends all configured tracker URLs.
 */
export function buildMagnetLink(hash: string, title: string): string {
    const params = new URLSearchParams({
        xt: `urn:btih:${hash}`,
        dn: title,
    });

    TRACKERS.forEach((tracker) => params.append('tr', tracker));

    return `magnet:?${params.toString()}`;
}
