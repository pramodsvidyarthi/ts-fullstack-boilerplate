import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const typeDefs = gql`
  type Query {
    templates: [Template!]!
    templateByName(id: String): Template!
  }

  type Template {
    id: String!
    name: String!
    columns: [Column!]!
  }

  type Column {
    id: Int
    title: String
  }

  input ColumnsInputType {
    id: Int
    title: String
  }

  type Mutation {
    createTemplate(name: String!, columns: [ColumnsInputType]!): Template!
  }
`;

const resolvers = {
  Query: {
    async templates() {
      const templates = await prisma.template.findMany();
      return templates;
    },
    async templateByName(parent, { id }) {
      const template = await prisma.template.findOne({
        where: { id },
      });
      return template;
    }
  },
  Mutation: {
    async createTemplate(parent: any, { name, columns }) {
      const data = await prisma.template.create({
        data: { name, columns }
      });
      return data;
    }
  },
}

export const schema = makeExecutableSchema({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default new ApolloServer({ schema }).createHandler({
  path: '/api',
})
