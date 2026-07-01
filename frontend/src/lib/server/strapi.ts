import { STRAPI_API_TOKEN, STRAPI_URL } from '$env/static/private';
import type { HomePage, StrapiHeader, StrapiResponse } from '$lib/types/strapi';

export async function strapiFetch<T>(
	endpoint: string,
	params?: Record<string, string>
): Promise<T> {
	const url = new URL(`/api${endpoint}`, STRAPI_URL);

	if (params) {
		for (const [key, value] of Object.entries(params)) {
			url.searchParams.set(key, value);
		}
	}

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${STRAPI_API_TOKEN}`
		}
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Strapi request failed (${response.status}): ${body}`);
	}

	return response.json() as Promise<T>;
}

export async function getSingleType<T>(
	endpoint: string,
	populate = '*'
): Promise<T | null> {
	const result = await strapiFetch<StrapiResponse<T>>(endpoint, { populate });
	return result.data ?? null;
}

export async function getHomePage(): Promise<HomePage | null> {
	const result = await strapiFetch<StrapiResponse<HomePage>>('/home-page', {

		'populate[sections][populate]': '*',
		'populate[sections][on][sections.whats-new][populate][trails][populate][photos]': '*',
		'populate[sections][on][sections.explore][populate][explore_card][populate][image]': '*'

	});
	return result.data ?? null;
}

export async function getHeader(): Promise<StrapiHeader | null> {
	const result = await strapiFetch<StrapiResponse<StrapiHeader>>('/header', {
		populate: '*'
	});
	return result.data ?? null;
}
