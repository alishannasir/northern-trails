import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::season.season', ({ strapi }) => ({
    async find(ctx) {
        ctx.query.populate = {
            trails: {
                populate: {
                    photos: { populate: {} }
                }
            }
        };
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },
    async findOne(ctx) {
        ctx.query.populate = {
            trails: {
                populate: {
                    photos: { populate: {} }
                }
            }
        };
        const { data, meta } = await super.findOne(ctx);
        return { data, meta };
    }
}));


