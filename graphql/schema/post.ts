import { objectType, queryField } from '@nexus/schema';

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
      async resolve(parent, _args, { prisma }) {
        const user = await prisma.user.findOne({
          where: { id: parent.authorId },
        });
        return user;
      },
    });
  },
});

export const getAllPosts = queryField('getAllPosts', {
  list: true,
  type: Post,
  async resolve(_parent, _args, { prisma }) {
    const posts = await prisma.post.findMany();
    return posts;
  },
});
