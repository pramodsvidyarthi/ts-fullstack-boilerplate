import {
  objectType,
  queryField,
  stringArg,
  mutationField,
} from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('email');
    t.string('name');
    t.list.field('posts', {
      type: 'Post',
      nullable: true,
      async resolve(parent, _args, { prisma }) {
        const posts = await prisma.post.findMany({
          where: { authorId: parent.id },
        });
        return posts;
      },
    });
  },
});

export const getAllUsers = queryField('getAllUsers', {
  list: true,
  type: User,
  async resolve(_parent, _args, { prisma }) {
    const users = await prisma.user.findMany();
    return users;
  },
});

export const getUserByEmailId = queryField('getUserByEmailId', {
  type: User,
  args: { email: stringArg({ required: true }) },
  async resolve(_parent, { email }, { prisma }) {
    const user = await prisma.user.findOne({
      where: { email },
    });
    return user;
  },
});

export const createUser = mutationField('createUser', {
  type: User,
  args: {
    email: stringArg({ required: true }),
    name: stringArg({ required: true }),
  },
  async resolve(_parent, { name, email }, { prisma }) {
    const data = await prisma.user.create({
      data: { name, email },
    });
    return data;
  },
});
