const express = require("express");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");

const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
const { prisma } = require("./db/prisma");

async function startServer() {
  const app = express();
  app.use(cors()); // Add this line to enable CORS

  // Token validation middleware
  app.use((req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decodedToken.userId; // Attach user ID to request
      } catch (error) {
        // Handle token validation error
        console.error("Token validation error:", error.message);
        return res.status(401).json({ message: "Invalid/Expired token." });
      }
    } else {
      console.log("No token provided.");
    }

    next();
  });

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req }) => ({ prisma, userId: req.userId }), // Pass userId to context
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
