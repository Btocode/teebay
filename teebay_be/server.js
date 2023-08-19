const express = require("express");
const { ApolloServer } = require("@apollo/server");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
            type Todo {
                id: ID!,
                title: String!,
                completed: Boolean
            }

            type Query {
                getTodos: [Todo]
            }
        `,
    resolvers: {
        Query: {
            getTodos: () => [
                { id: 1, title: "Todo 1", completed: false },
            ]
    },
}
})

  app.use(bodyParser.json());
  app.use(cors());
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(3000, () => console.log("Server started at port 3000"));
}

startServer();
