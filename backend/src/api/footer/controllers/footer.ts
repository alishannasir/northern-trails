import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::footer.footer', ({ strapi }) => ({
    async find(ctx) {
        ctx.query.populate = {
            footer_columns: { populate: {} }
        };
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));


