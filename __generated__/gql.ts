/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation AddToCart($input: AddToCartInput!) {\n  addToCart(input: $input) {\n    success\n  }\n}": types.AddToCartDocument,
    "mutation AddWood($name: String!) {\n  addWood(name: $name) {\n    success\n  }\n}": types.AddWoodDocument,
    "mutation CaptureOrder($orderId: String!) {\n  captureOrder(orderId: $orderId) {\n    id\n    status\n  }\n}": types.CaptureOrderDocument,
    "mutation CreateOrder {\n  createOrder {\n    id\n    status\n    links {\n      href\n      rel\n      method\n    }\n  }\n}": types.CreateOrderDocument,
    "mutation DeleteWood($name: String!) {\n  deleteWood(name: $name) {\n    success\n  }\n}": types.DeleteWoodDocument,
    "query GetAllBrands {\n  getAllBrands {\n    name\n    _id\n  }\n}": types.GetAllBrandsDocument,
    "query GetAllWoods {\n  getAllWoods {\n    _id\n    name\n  }\n}": types.GetAllWoodsDocument,
    "query GetCardBlockItems($sortBy: SortBy!) {\n  getCardBlockItems(sortBy: $sortBy) {\n    _id\n    image\n    brand {\n      name\n    }\n    name\n    price\n  }\n}": types.GetCardBlockItemsDocument,
    "query GetCartProducts {\n  getCartProducts {\n    userId\n    productId\n    name\n    quantity\n    price\n    image\n  }\n}": types.GetCartProductsDocument,
    "query GetProductById($_id: ObjectId!) {\n  getProductById(_id: $_id) {\n    _id\n    name\n    description\n    price\n    brand {\n      _id\n      name\n    }\n    shipping\n    available\n    wood {\n      _id\n      name\n    }\n    frets\n    sold\n    publish\n    images {\n      url\n      public_id\n    }\n  }\n}": types.GetProductByIdDocument,
    "query GetProductsToShop($filters: GetProductsToShopFiltersInput, $sortBy: SortBy, $limit: Float, $order: SortOrderScalar, $skip: Float) {\n  getProductsToShop(\n    filters: $filters\n    sortBy: $sortBy\n    limit: $limit\n    order: $order\n    skip: $skip\n  ) {\n    size\n    total\n    products {\n      _id\n      image\n      brand {\n        name\n      }\n      name\n      price\n      description\n    }\n  }\n}": types.GetProductsToShopDocument,
    "mutation RemoveFromCart($productId: ObjectId!) {\n  removeFromCart(productId: $productId) {\n    success\n  }\n}": types.RemoveFromCartDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddToCart($input: AddToCartInput!) {\n  addToCart(input: $input) {\n    success\n  }\n}"): (typeof documents)["mutation AddToCart($input: AddToCartInput!) {\n  addToCart(input: $input) {\n    success\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddWood($name: String!) {\n  addWood(name: $name) {\n    success\n  }\n}"): (typeof documents)["mutation AddWood($name: String!) {\n  addWood(name: $name) {\n    success\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CaptureOrder($orderId: String!) {\n  captureOrder(orderId: $orderId) {\n    id\n    status\n  }\n}"): (typeof documents)["mutation CaptureOrder($orderId: String!) {\n  captureOrder(orderId: $orderId) {\n    id\n    status\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateOrder {\n  createOrder {\n    id\n    status\n    links {\n      href\n      rel\n      method\n    }\n  }\n}"): (typeof documents)["mutation CreateOrder {\n  createOrder {\n    id\n    status\n    links {\n      href\n      rel\n      method\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteWood($name: String!) {\n  deleteWood(name: $name) {\n    success\n  }\n}"): (typeof documents)["mutation DeleteWood($name: String!) {\n  deleteWood(name: $name) {\n    success\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetAllBrands {\n  getAllBrands {\n    name\n    _id\n  }\n}"): (typeof documents)["query GetAllBrands {\n  getAllBrands {\n    name\n    _id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetAllWoods {\n  getAllWoods {\n    _id\n    name\n  }\n}"): (typeof documents)["query GetAllWoods {\n  getAllWoods {\n    _id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCardBlockItems($sortBy: SortBy!) {\n  getCardBlockItems(sortBy: $sortBy) {\n    _id\n    image\n    brand {\n      name\n    }\n    name\n    price\n  }\n}"): (typeof documents)["query GetCardBlockItems($sortBy: SortBy!) {\n  getCardBlockItems(sortBy: $sortBy) {\n    _id\n    image\n    brand {\n      name\n    }\n    name\n    price\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCartProducts {\n  getCartProducts {\n    userId\n    productId\n    name\n    quantity\n    price\n    image\n  }\n}"): (typeof documents)["query GetCartProducts {\n  getCartProducts {\n    userId\n    productId\n    name\n    quantity\n    price\n    image\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProductById($_id: ObjectId!) {\n  getProductById(_id: $_id) {\n    _id\n    name\n    description\n    price\n    brand {\n      _id\n      name\n    }\n    shipping\n    available\n    wood {\n      _id\n      name\n    }\n    frets\n    sold\n    publish\n    images {\n      url\n      public_id\n    }\n  }\n}"): (typeof documents)["query GetProductById($_id: ObjectId!) {\n  getProductById(_id: $_id) {\n    _id\n    name\n    description\n    price\n    brand {\n      _id\n      name\n    }\n    shipping\n    available\n    wood {\n      _id\n      name\n    }\n    frets\n    sold\n    publish\n    images {\n      url\n      public_id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProductsToShop($filters: GetProductsToShopFiltersInput, $sortBy: SortBy, $limit: Float, $order: SortOrderScalar, $skip: Float) {\n  getProductsToShop(\n    filters: $filters\n    sortBy: $sortBy\n    limit: $limit\n    order: $order\n    skip: $skip\n  ) {\n    size\n    total\n    products {\n      _id\n      image\n      brand {\n        name\n      }\n      name\n      price\n      description\n    }\n  }\n}"): (typeof documents)["query GetProductsToShop($filters: GetProductsToShopFiltersInput, $sortBy: SortBy, $limit: Float, $order: SortOrderScalar, $skip: Float) {\n  getProductsToShop(\n    filters: $filters\n    sortBy: $sortBy\n    limit: $limit\n    order: $order\n    skip: $skip\n  ) {\n    size\n    total\n    products {\n      _id\n      image\n      brand {\n        name\n      }\n      name\n      price\n      description\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation RemoveFromCart($productId: ObjectId!) {\n  removeFromCart(productId: $productId) {\n    success\n  }\n}"): (typeof documents)["mutation RemoveFromCart($productId: ObjectId!) {\n  removeFromCart(productId: $productId) {\n    success\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;