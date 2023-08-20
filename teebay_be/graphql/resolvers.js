const { prisma } = require("../db/prisma");

const resolvers = {
  Query: {
    message: () => "Hello World",
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new Error("User with this email already exists.");
      }

      const newUser = await prisma.user.create({
        data: input,
      });
      return newUser;
    },
  },
};

module.exports = { resolvers };
