import { ApolloServer } from 'apollo-server-micro';
import { makeSchema } from '@nexus/schema';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import * as schemaTypes from '../../schema';

const prisma = new PrismaClient();

export const schema = makeSchema({
  types: schemaTypes,
  outputs: {
    typegen: path.join(process.cwd(), 'generated', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated', 'schema.graphql'),
  },
});

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
