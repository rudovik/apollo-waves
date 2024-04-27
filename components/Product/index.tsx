"use client"

import {
  GetProductByIdDocument,
  AddToCartDocument,
  GetCartProductsDocument,
} from "__generated__/graphql"
import { useSuspenseQuery, useMutation } from "@apollo/client"
import { ProductImages } from "./ProductImages"
import { ProductInfo } from "./ProductInfo"

export default function Product({ _id }) {
  const {
    data: { getProductById: product },
  } = useSuspenseQuery(GetProductByIdDocument, {
    variables: {
      _id,
    },
  })
  const [addToCartMutation, { loading: disabled }] =
    useMutation(AddToCartDocument)

  async function addToCart() {
    await addToCartMutation({
      variables: {
        input: {
          productId: _id,
          quantity: 1,
        },
      },
      refetchQueries: [GetCartProductsDocument],
      awaitRefetchQueries: true,
    })
  }

  return (
    <div className="product">
      <div className="product__left">
        <ProductImages images={product.images} />
      </div>
      <div className="product__right">
        <ProductInfo
          product={product}
          addToCart={addToCart}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
