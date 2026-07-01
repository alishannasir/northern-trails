import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::home-page.home-page', ({ strapi }) => ({
    async find(ctx) {
        ctx.query.populate = {
            sections: {
                on: {
                    'sections.hero': {
                        populate: {
                            logo_icon: { populate: {} },
                            slide: {
                                populate: {
                                    background_images: { populate: {} },
                                },
                            },
                        },
                    },
                    'sections.all-about-hiking': {
                        populate: {
                            image: { populate: {} }
                        },
                    },
                    'sections.whats-new': {
                        populate: {
                            trails: {
                                populate: {
                                    photos: { populate: {} },
                                    district_start: {
                                        populate: {
                                            division: { populate: {} }
                                        }
                                    },
                                    district_end: {
                                        populate: {
                                            division: { populate: {} }
                                        }
                                    },
                                    tehsil_start: {
                                        populate: {
                                            district: {
                                                populate: {
                                                    division: { populate: {} }
                                                }
                                            }
                                        }
                                    },
                                    tehsil_end: {
                                        populate: {
                                            district: {
                                                populate: {
                                                    division: { populate: {} }
                                                }
                                            }
                                        }
                                    },
                                    seasons: { populate: {} }
                                }
                            }
                        },
                    },
                    'sections.explore': {
                        populate: {
                            explore_card: {
                                populate: {
                                    image: { populate: {} }
                                }
                            }
                        },
                    },
                    'shared.about-us': {
                        populate: {
                            image: { populate: {} }
                        },
                    }
                },
            },
        };

        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },
}));


