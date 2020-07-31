import { objectType } from '@nexus/schema';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id');
    t.string('title');
    t.string('content', { nullable: true });
    t.boolean('published');
    t.int('authorId');
    t.field('author', {
      type: 'User',
      nullable: true,
      resolve: async (parent, args, { db }) => {
        const user = await db.user.findOne({ where: { id: parent.authorId } });
        return user;
      },
    });
  },
});
