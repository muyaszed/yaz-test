import { gql } from "apollo-boost";

export interface Product {
  id: number;
  name: string;
  power: string;
  description: string;
  price: number;
  quantity: number;
  brand: string;
  weight: number;
  height: number;
  width: number;
  length: number;
  modelCode: string;
  colour: string;
  imgUrl: string;
}

export interface ProductData {
  product: Product;
}

export interface ProductVar {
  productId: number;
}

const GET_PRODUCT_BY_ID = gql`
  query GetProductById($productId: ID!) {
    product(productId: $productId) {
      id
      name
      power
      description
      price
      quantity
      brand
      weight
      height
      width
      length
      modelCode
      colour
      imgUrl
    }
  }
`;

export default GET_PRODUCT_BY_ID;
