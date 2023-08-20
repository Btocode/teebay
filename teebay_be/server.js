const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");

const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
const { prisma } = require("./db/prisma");

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: { prisma },
  });

  app.use(cors());
  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}

startServer();
