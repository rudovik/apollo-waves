"use client"
import { useSuspenseQuery } from "@apollo/client"
import { GetCartProductsDocument } from "__generated__/graphql"

import Link from "next/link"

export default function CartLink() {
  const {
    data: { getCartProducts: cartItems },
  } = useSuspenseQuery(GetCartProductsDocument)

  return (
    <Link href="/user/cart" className="header__link header__link--cartLink">
      <span>{cartItems.length}</span>My Cart
    </Link>
  )
}
