import { objectType, stringArg } from '@nexus/schema';

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.list.field("templates", {
      type: "Template",
      resolve: async (parent, args, { db }) => {
        const templates = await db.template.findMany();
        return templates;
      }
    });

    t.field("templateByName", {
      type: "Template",
      args: {
        id: stringArg(),
      },
      resolve: async (parent, { id }, { db }) => {
        const template = await db.template.findOne({
          where: { id },
        });
        return template;
      }
    })
  }
});
