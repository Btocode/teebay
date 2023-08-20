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

const LOGIN_USER = gql`
    mutation LoginUser($input: LoginUserInput!) {
        loginUser(input: $input) {
            email
            password
            token
        }
    }
`;


export { CREATE_USER };