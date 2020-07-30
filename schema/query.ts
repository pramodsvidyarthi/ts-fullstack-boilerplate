import { objectType, stringArg } from '@nexus/schema';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('getAllUsers', {
      type: 'User',
      resolve: async (parent, args, { db }) => {
        const users = await db.user.findMany();
        return users;
      },
    });

    t.field('getUserByEmail', {
      type: 'User',
      args: {
        email: stringArg(),
      },
      resolve: async (parent, { email }, { db }) => {
        const user = await db.user.findOne({
          where: { email },
        });
        return user;
      },
    });
  },
});
