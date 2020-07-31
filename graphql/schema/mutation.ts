import { objectType, stringArg } from '@nexus/schema';

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        name: stringArg({ required: true }),
        email: stringArg({ required: true }),
      },
      resolve: async (parent, { name, email }, { db }) => {
        const data = await db.user.create({
          data: { name, email },
        });
        return data;
      },
    });
  },
});
