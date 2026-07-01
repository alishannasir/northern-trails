import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::lets-hike.lets-hike', ({ strapi }) => ({
    async find(ctx) {
        ctx.query.populate = {
            image: { populate: {} }
        };
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));


