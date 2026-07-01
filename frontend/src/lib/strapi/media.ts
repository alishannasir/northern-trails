import { PUBLIC_STRAPI_URL } from '$env/static/public';

export function strapiMediaUrl(url: string | null | undefined): string | null {
	if (!url) return null;
	if (url.startsWith('http')) return url;
	return `${PUBLIC_STRAPI_URL}${url}`;
}
