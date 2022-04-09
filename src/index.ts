import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

// 1
const startServer = async () => {
  const app = express()
  const httpServer = createServer(app)

  // Define Schema
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  // Define Resolvers
  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };

  // Create GraphQL server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  // Start apolloserver
  await apolloServer.start()

  // Add middleware
  apolloServer.applyMiddleware({
      app,
      path: '/graphql'
  })

  // Start server
  const PORT =  process.env.PORT || 5000;
  httpServer.listen({ port: PORT}, () =>
    console.log(`Server listening on localhost:${PORT} ${apolloServer.graphqlPath}`)
  )
}

startServer()
