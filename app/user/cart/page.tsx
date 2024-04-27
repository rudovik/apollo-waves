"use client"
import { useSuspenseQuery, useMutation } from "@apollo/client"
import {
  GetCartProductsDocument,
  RemoveFromCartDocument,
} from "__generated__/graphql"
import { CartBlock } from "components/CartBlock"
import PayPalButton from "components/PayPalButton"

export default function CartPage() {
  const {
    data: { getCartProducts: cartItems },
  } = useSuspenseQuery(GetCartProductsDocument)

  const [removeFromCartMutation, { loading }] = useMutation(
    RemoveFromCartDocument
  )

  async function removeFromCart(productId) {
    await removeFromCartMutation({
      variables: { productId },
      refetchQueries: [GetCartProductsDocument],
      awaitRefetchQueries: true,
    })
  }

  function calculateTotal(cartItems) {
    if (cartItems.length <= 0) return
    let total = 0

    cartItems.forEach((cartItem) => {
      total += cartItem.quantity * parseInt(cartItem.price, 10)
    })

    return total
  }

  return (
    <>
      <h1 className="userContainer__title">My cart</h1>
      <div className="userCart">
        <CartBlock removeItem={removeFromCart} items={cartItems} />
        {cartItems.length > 0 && (
          <div className="userCart__sum">
            Total amount $ {calculateTotal(cartItems)}
          </div>
        )}
        {cartItems.length > 0 && <PayPalButton />}
      </div>
    </>
  )
}
