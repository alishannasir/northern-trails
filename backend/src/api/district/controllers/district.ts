import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::district.district', ({ strapi }) => ({
    async find(ctx) {
        ctx.query.populate = {
            division: { populate: {} }
        };
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },
    async findOne(ctx) {
        ctx.query.populate = {
            division: { populate: {} }
        };
        const { data, meta } = await super.findOne(ctx);
        return { data, meta };
    }
}));


