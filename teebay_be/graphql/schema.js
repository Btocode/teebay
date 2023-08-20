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
  }
`;

module.exports = { typeDefs };
