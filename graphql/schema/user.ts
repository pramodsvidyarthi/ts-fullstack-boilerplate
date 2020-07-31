import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('email');
    t.string('name');
    t.list.field('posts', {
      type: 'Post',
      nullable: true,
      resolve: async (parent, args, { db }) => {
        const posts = await db.post.findMany({
          where: { authorId: parent.id },
        });
        return posts;
      },
    });
  },
});
