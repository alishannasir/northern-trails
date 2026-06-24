import { getHeader } from '$lib/server/strapi';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    const header = await getHeader();

    return { header };
};
