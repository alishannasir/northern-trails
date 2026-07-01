import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::header.header', ({ strapi }) => ({
    async find(ctx) {
        ctx.query.populate = {
            logo: { populate: {} },
            nav_links: { populate: {} }
        };
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));


