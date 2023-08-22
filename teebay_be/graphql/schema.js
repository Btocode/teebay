const { gql } = require("apollo-server-express");

const typeDefs = gql`
  input CreateUserInput {
    firstname: String!
    lastname: String!
    password: String!
    email: String!
    address: String!
    phone: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input CreateProductInput {
    title: String!
    price: Int!
    rent: Int!
    rent_type: String!
    categories: [String!]!
    description: String!
  }

  type Product {
    id: ID!
    title: String!
    price: Int!
    rent: Int!
    rent_type: String!
    categories: [String!]!
    description: String!
    date_posted: String!
    views: Int!
    seller: User
  }

  type User {
    id: ID!
    firstname: String!
    lastname: String!
    password: String!
    email: String!
    address: String!
    phone: String!
    token: String
  }

  type Query {
    message: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    loginUser(input: LoginUserInput!): User
    createProduct(input: CreateProductInput!): Product
  }
`;

module.exports = { typeDefs };
