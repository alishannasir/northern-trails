/**
 * home-page controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::home-page.home-page', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: {
                sections: {
                    on: {
                        'sections.hero': {
                            populate: {
                                logo_icon: true,
                                slide: {
                                    populate: {
                                        background_images: true,
                                    },
                                },
                            },
                        },
                        'sections.all-about-hiking': {
                            populate: '*',
                        },
                        'sections.whats-new': {
                            populate: '*',
                        },
                        'sections.explore': {
                            populate: '*',
                        },
                        'shared.about-us': {
                            populate: '*',
                        }
                    },
                },
            },
        };

        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },
}));
