/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Mongo id scalar type */
  ObjectId: { input: any; output: any; }
  /** Mongoose Sort Order Scalar */
  SortOrderScalar: { input: any; output: any; }
};

export type AddToCartInput = {
  productId: Scalars['ObjectId']['input'];
  quantity: Scalars['Float']['input'];
};

/** Brand */
export type Brand = {
  __typename?: 'Brand';
  _id: Scalars['ObjectId']['output'];
  name: Scalars['String']['output'];
};

export type CardBlockItem = {
  __typename?: 'CardBlockItem';
  _id: Scalars['ObjectId']['output'];
  brand: Brand;
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type CardBlockItemWithDescription = {
  __typename?: 'CardBlockItemWithDescription';
  _id: Scalars['ObjectId']['output'];
  brand: Brand;
  description: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type CartItem = {
  __typename?: 'CartItem';
  _id: Scalars['ObjectId']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  productId: Scalars['ObjectId']['output'];
  quantity: Scalars['Float']['output'];
  userId: Scalars['ObjectId']['output'];
};

export type GenericResponse = {
  __typename?: 'GenericResponse';
  success: Scalars['Boolean']['output'];
};

export type GetProductsToShopFiltersInput = {
  brand?: InputMaybe<Array<Scalars['ObjectId']['input']>>;
  frets?: InputMaybe<Array<Scalars['Float']['input']>>;
  price?: InputMaybe<PriceInput>;
  wood?: InputMaybe<Array<Scalars['ObjectId']['input']>>;
};

export type ImageType = {
  __typename?: 'ImageType';
  public_id: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBrand: GenericResponse;
  addToCart: GenericResponse;
  addWood: GenericResponse;
  captureOrder: PayPalCaptureOrderResponse;
  createOrder: PayPalCreateOrderResponse;
  deleteBrand: GenericResponse;
  deleteWood: GenericResponse;
  removeFromCart: GenericResponse;
};


export type MutationAddBrandArgs = {
  name: Scalars['String']['input'];
};


export type MutationAddToCartArgs = {
  input: AddToCartInput;
};


export type MutationAddWoodArgs = {
  name: Scalars['String']['input'];
};


export type MutationCaptureOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationDeleteBrandArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteWoodArgs = {
  name: Scalars['String']['input'];
};


export type MutationRemoveFromCartArgs = {
  productId: Scalars['ObjectId']['input'];
};

export type PayPalCaptureOrderResponse = {
  __typename?: 'PayPalCaptureOrderResponse';
  id: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type PayPalCreateOrderResponse = {
  __typename?: 'PayPalCreateOrderResponse';
  id: Scalars['String']['output'];
  links: Array<PayPalLinkItem>;
  status: Scalars['String']['output'];
};

export type PayPalLinkItem = {
  __typename?: 'PayPalLinkItem';
  href: Scalars['String']['output'];
  method: RequestMethod;
  rel: RequestRelation;
};

export type PriceInput = {
  gte: Scalars['Float']['input'];
  lte: Scalars['Float']['input'];
};

/** Product */
export type Product = {
  __typename?: 'Product';
  _id: Scalars['ObjectId']['output'];
  available: Scalars['Boolean']['output'];
  brand: Brand;
  description: Scalars['String']['output'];
  frets: Scalars['Float']['output'];
  images: Array<Maybe<ImageType>>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  publish: Scalars['Boolean']['output'];
  shipping: Scalars['Boolean']['output'];
  sold: Scalars['Float']['output'];
  wood: Wood;
};

export type ProductShopResponse = {
  __typename?: 'ProductShopResponse';
  products: Array<Maybe<CardBlockItemWithDescription>>;
  size: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllBrands: Array<Maybe<Brand>>;
  getAllWoods: Array<Maybe<Wood>>;
  getCardBlockItems?: Maybe<Array<CardBlockItem>>;
  getCartProducts: Array<Maybe<CartItem>>;
  getProductById?: Maybe<Product>;
  getProductsToShop: ProductShopResponse;
};


export type QueryGetCardBlockItemsArgs = {
  sortBy: SortBy;
};


export type QueryGetProductByIdArgs = {
  _id: Scalars['ObjectId']['input'];
};


export type QueryGetProductsToShopArgs = {
  filters?: InputMaybe<GetProductsToShopFiltersInput>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  order?: InputMaybe<Scalars['SortOrderScalar']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  sortBy?: InputMaybe<SortBy>;
};

/** Allowed request methods */
export enum RequestMethod {
  Get = 'GET',
  Patch = 'PATCH',
  Post = 'POST'
}

/** Allowed request relations */
export enum RequestRelation {
  Approve = 'APPROVE',
  Capture = 'CAPTURE',
  Self = 'SELF',
  Update = 'UPDATE'
}

/** Allowable sort by values */
export enum SortBy {
  Id = '_id',
  CreatedAt = 'createdAt',
  Sold = 'sold'
}

/** Wood */
export type Wood = {
  __typename?: 'Wood';
  _id: Scalars['ObjectId']['output'];
  name: Scalars['String']['output'];
};

export type AddToCartMutationVariables = Exact<{
  input: AddToCartInput;
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addToCart: { __typename?: 'GenericResponse', success: boolean } };

export type AddWoodMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddWoodMutation = { __typename?: 'Mutation', addWood: { __typename?: 'GenericResponse', success: boolean } };

export type CaptureOrderMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type CaptureOrderMutation = { __typename?: 'Mutation', captureOrder: { __typename?: 'PayPalCaptureOrderResponse', id: string, status: string } };

export type CreateOrderMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'PayPalCreateOrderResponse', id: string, status: string, links: Array<{ __typename?: 'PayPalLinkItem', href: string, rel: RequestRelation, method: RequestMethod }> } };

export type DeleteWoodMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type DeleteWoodMutation = { __typename?: 'Mutation', deleteWood: { __typename?: 'GenericResponse', success: boolean } };

export type GetAllBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBrandsQuery = { __typename?: 'Query', getAllBrands: Array<{ __typename?: 'Brand', name: string, _id: any } | null> };

export type GetAllWoodsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllWoodsQuery = { __typename?: 'Query', getAllWoods: Array<{ __typename?: 'Wood', _id: any, name: string } | null> };

export type GetCardBlockItemsQueryVariables = Exact<{
  sortBy: SortBy;
}>;


export type GetCardBlockItemsQuery = { __typename?: 'Query', getCardBlockItems?: Array<{ __typename?: 'CardBlockItem', _id: any, image?: string | null, name: string, price: number, brand: { __typename?: 'Brand', name: string } }> | null };

export type GetCartProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartProductsQuery = { __typename?: 'Query', getCartProducts: Array<{ __typename?: 'CartItem', userId: any, productId: any, name: string, quantity: number, price: number, image?: string | null } | null> };

export type GetProductByIdQueryVariables = Exact<{
  _id: Scalars['ObjectId']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById?: { __typename?: 'Product', _id: any, name: string, description: string, price: number, shipping: boolean, available: boolean, frets: number, sold: number, publish: boolean, brand: { __typename?: 'Brand', _id: any, name: string }, wood: { __typename?: 'Wood', _id: any, name: string }, images: Array<{ __typename?: 'ImageType', url: string, public_id: string } | null> } | null };

export type GetProductsToShopQueryVariables = Exact<{
  filters?: InputMaybe<GetProductsToShopFiltersInput>;
  sortBy?: InputMaybe<SortBy>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  order?: InputMaybe<Scalars['SortOrderScalar']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetProductsToShopQuery = { __typename?: 'Query', getProductsToShop: { __typename?: 'ProductShopResponse', size: number, total: number, products: Array<{ __typename?: 'CardBlockItemWithDescription', _id: any, image?: string | null, name: string, price: number, description: string, brand: { __typename?: 'Brand', name: string } } | null> } };

export type RemoveFromCartMutationVariables = Exact<{
  productId: Scalars['ObjectId']['input'];
}>;


export type RemoveFromCartMutation = { __typename?: 'Mutation', removeFromCart: { __typename?: 'GenericResponse', success: boolean } };


export const AddToCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddToCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddToCartInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddToCartMutation, AddToCartMutationVariables>;
export const AddWoodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddWood"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addWood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddWoodMutation, AddWoodMutationVariables>;
export const CaptureOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CaptureOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"captureOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CaptureOrderMutation, CaptureOrderMutationVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"rel"}},{"kind":"Field","name":{"kind":"Name","value":"method"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const DeleteWoodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWood"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWood"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteWoodMutation, DeleteWoodMutationVariables>;
export const GetAllBrandsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllBrands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllBrands"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<GetAllBrandsQuery, GetAllBrandsQueryVariables>;
export const GetAllWoodsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllWoods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllWoods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllWoodsQuery, GetAllWoodsQueryVariables>;
export const GetCardBlockItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCardBlockItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SortBy"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCardBlockItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<GetCardBlockItemsQuery, GetCardBlockItemsQueryVariables>;
export const GetCartProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCartProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCartProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<GetCartProductsQuery, GetCartProductsQueryVariables>;
export const GetProductByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectId"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shipping"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"wood"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"frets"}},{"kind":"Field","name":{"kind":"Name","value":"sold"}},{"kind":"Field","name":{"kind":"Name","value":"publish"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const GetProductsToShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductsToShop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetProductsToShopFiltersInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortOrderScalar"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProductsToShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsToShopQuery, GetProductsToShopQueryVariables>;
export const RemoveFromCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFromCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectId"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RemoveFromCartMutation, RemoveFromCartMutationVariables>;