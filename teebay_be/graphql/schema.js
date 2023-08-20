
const typeDefs = `
  type Mutation {
    createUser(input: CreateUserInput!): User
  }

  input CreateUserInput {
    firstname: String!
    lastname: String!
    password: String!
    email: String!
    address: String!
    phone: String!
  }

  type User {
    id: ID!
    firstname: String!
    lastname: String!
    password: String!
    email: String!
    address: String!
    phone: String!
  }
`;

module.exports = typeDefs;
