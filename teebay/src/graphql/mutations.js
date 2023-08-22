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
      id
      token
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      title
      price
      rent
    }
  }
`;


export { CREATE_USER, LOGIN_USER, CREATE_PRODUCT };
