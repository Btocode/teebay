import { gql } from "@apollo/client";

// Get all products of this user and sort by date posted
const GET_PRODUCT_LIST_OF_USER = gql`
  query GetProductListOfUser {
    getProductListOfUser {
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

// Get Product by ID
const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      title
      price
      rent
      rent_type
      categories
      description
      date_posted
    }
  }
`;

export { GET_PRODUCT_LIST_OF_USER, GET_PRODUCT };

// query{
//   getProductListOfUser {
//     id
//   }
// }
