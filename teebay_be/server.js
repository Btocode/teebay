const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");

const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
const { prisma } = require("./db/prisma");

async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: { prisma },
  });

  await apolloServer.start();

  // Apply Apollo Server as middleware to the Express app
  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}

startServer();
