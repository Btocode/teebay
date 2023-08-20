const { prisma } = require("../db/prisma");

const resolvers = {
  Mutation: {
    createUser: async (_, { input }) => {
      const newUser = await prisma.user.create({
        data: input,
      });
      return newUser;
    },
  },
};

module.exports = { resolvers };
