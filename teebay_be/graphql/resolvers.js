const { prisma } = require("../db/prisma");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    message: () => "Hello World",
  },
  Mutation: {
    createUser: async (_, { input }) => {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      });

      // If user exists, throw error
      if (existingUser) {
        throw new ApolloError(
          "User with this email already exists.",
          "USER_EXISTS"
        );
      }

      // If user does not exist, hash password
      let hashedPassword = await bcrypt.hash(input.password, 10);
      input.password = hashedPassword;

      // Create user
      const newUser = await prisma.user.create({
        data: input,
      });

      // Generate token
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Add token to user object
      newUser.token = token;

      return newUser;
    },
    loginUser: async (_, { input }) => {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      });

      // If user does not exist, throw error
      if (!existingUser) {
        throw new ApolloError(
          "User with this email does not exist.",
          "USER_NOT_FOUND"
        );
      }

      // If user exists, check if password is correct
      if (!(await bcrypt.compare(input.password, existingUser.password))) {
        throw new ApolloError("Password is incorrect.", "INCORRECT_PASSWORD");
      }

      // If password is correct, generate token
      const token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Add token to user object
      existingUser.token = token;

      return existingUser;
    },
  },
};

module.exports = { resolvers };
