import { query } from "./_generated/server";

export const GetAllTemplates = query({
    args: {},
    handler: async (ctx, db) => {
        const result = await ctx.db.query('templates').collect();
        return result;
    }
})