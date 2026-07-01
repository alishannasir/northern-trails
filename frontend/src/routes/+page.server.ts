import { getHomePage } from '$lib/server/strapi';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const homePage = await getHomePage();

	return { homePage };
};
