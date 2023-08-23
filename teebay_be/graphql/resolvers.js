const { prisma } = require("../db/prisma");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    getProductListOfUser: async (_, __, context) => {
      const { userId } = context; // Extracted from the authentication token

      if (!userId) {
        throw new ApolloError("Authentication required.", "UNAUTHORIZED");
      }

      const products = await prisma.product.findMany({
        where: {
          sellerId: userId,
        },
        orderBy: {
          date_posted: "desc",
        },
      });

      return products;
    },
    getProduct: async (_, { id }) => {
      let uid = parseInt(id);
      try {
        const product = await prisma.product.findUnique({
          where: { id: uid },
          include: { seller: true },
        });

        return product;
      } catch (error) {
        throw new ApolloError("Product not found.", "PRODUCT_NOT_FOUND");
      }
    },
    // get all the products from the database
    getAllProducts: async (_, __, context) => {
      const { userId } = context;

      const products = await prisma.product.findMany({
        where: {
          sellerId: {
            not: userId,
          },
        },
        orderBy: {
          date_posted: "desc",
        },
        include: { seller: true },
      });

      return products;
    },
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
        {
          userId: newUser.id,
          email: newUser.email,
          isSeller: false,
        },
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
        {
          userId: existingUser.id,
          email: existingUser.email,
          isSeller: false,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Add token to user object
      existingUser.token = token;

      return existingUser;
    },
    createProduct: async (_, { input }, context) => {
      const { userId } = context;

      if (!userId) {
        throw new ApolloError("Authentication required.", "UNAUTHORIZED");
      }

      // Create product
      const newProduct = await prisma.product.create({
        data: {
          ...input,
          seller: { connect: { id: userId } },
        },
      });

      return newProduct;
    },
    updateProduct: async (_, { id, input }, context) => {
      const { userId } = context;

      if (!userId) {
        throw new ApolloError("Authentication required.", "UNAUTHORIZED");
      }

      let pid = parseInt(id);
      const product = await prisma.product.findUnique({
        where: { id: pid },
      });

      if (!product) {
        throw new ApolloError("Product not found.", "PRODUCT_NOT_FOUND");
      }

      if (product.sellerId !== userId) {
        throw new ApolloError(
          "You are not the seller of this product.",
          "UNAUTHORIZED"
        );
      }

      const updatedProduct = await prisma.product.update({
        where: { id: pid },
        data: input,
      });

      return updatedProduct;
    },
    deleteProduct: async (_, { id }, context) => {
      const { userId } = context;

      if (!userId) {
        throw new ApolloError("Authentication required.", "UNAUTHORIZED");
      }

      let pid = parseInt(id);
      const product = await prisma.product.findUnique({
        where: { id: pid },
      });

      if (!product) {
        throw new ApolloError("Product not found.", "PRODUCT_NOT_FOUND");
      }

      if (product.sellerId !== userId) {
        throw new ApolloError(
          "You are not the seller of this product.",
          "UNAUTHORIZED"
        );
      }

      const deletedProduct = await prisma.product.delete({
        where: { id: pid },
      });

      return deletedProduct;
    },
  },
};

module.exports = { resolvers };
