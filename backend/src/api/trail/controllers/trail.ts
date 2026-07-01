import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::trail.trail', ({ strapi }) => ({
    async find(ctx) {
        ctx.query.populate = {
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
        };
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },
    async findOne(ctx) {
        ctx.query.populate = {
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
        };
        const { data, meta } = await super.findOne(ctx);
        return { data, meta };
    }
}));


