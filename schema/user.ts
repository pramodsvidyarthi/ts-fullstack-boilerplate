import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('email');
    t.string('name');
  },
});
