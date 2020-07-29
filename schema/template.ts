import { objectType } from '@nexus/schema';

export const Column = objectType({
  name: 'Column',
  definition(t) {
    t.int('id', { nullable: true });
    t.string('title', { nullable: true });
  },
});

export const Template = objectType({
  name: 'Template',
  definition(t) {
    t.string('id');
    t.string('name');
    t.list.field('columns', { type: Column });
  },
});
