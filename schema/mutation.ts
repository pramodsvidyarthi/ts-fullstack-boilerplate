import { objectType, stringArg, arg, inputObjectType } from '@nexus/schema';

export const ColumnsInputType = inputObjectType({
  name: 'ColumnsInputType',
  definition(t) {
    t.int('id');
    t.string('title');
  },
});

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createTemplate', {
      type: 'Template',
      args: {
        name: stringArg({ required: true }),
        columns: arg({
          type: ColumnsInputType,
          list: true,
          required: true,
        }),
      },
      resolve: async (parent: any, { name, columns }, { db }) => {
        const data = await db.template.create({
          data: { name, columns },
        });
        return data;
      },
    });
  },
});
