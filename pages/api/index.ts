import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import schema from '../../schema';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({
  schema,
  context: { db: prisma },
}).createHandler({
  path: '/api',
});
