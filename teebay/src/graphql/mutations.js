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

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      title
      price
      rent
      rent_type
      categories
      description
      date_posted
      views
    }

  }
`;

export { CREATE_USER, LOGIN_USER, CREATE_PRODUCT, UPDATE_PRODUCT };
