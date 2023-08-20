import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      firstname
      lastname
      email
      address
      phone
      id
    }
  }
`;

export { CREATE_USER };