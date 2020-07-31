import { makeSchema } from '@nexus/schema';
import path from 'path';

import * as User from './user';
import * as Post from './post';
import * as Query from './query';
import * as Mutation from './mutation';

export const schema = makeSchema({
  types: [User, Post, Query, Mutation],
  outputs: {
    typegen: path.join(process.cwd(), 'generated', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated', 'schema.graphql'),
  },
  prettierConfig: path.join(process.cwd(), '.prettierrc'),
});

export default schema;
