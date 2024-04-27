"use client"
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons"

// import { useAuth } from "lib/useAuth"
// import { useAddProductToCartMutation } from "lib/graphql/AddProductToCart.graphql"
import Button from "./Button"

import {
  AddToCartDocument,
  GetCartProductsDocument,
} from "__generated__/graphql"
import { useMutation } from "@apollo/client"

export const Card = ({
  grid = false,
  image = null,
  brand: { name: brandName },
  name,
  price,
  _id,
  description,
  session,
  classModifier = "",
}) => {
  const [addProduct, { data, loading }] = useMutation(AddToCartDocument)

  // const { user, refetchAuth } = useAuth()
  // const [addProductToCartMutation, { data, loading, error, client }] =
  //   useAddProductToCartMutation()

  // const renderCardImage = (image: string) => {
  //   if (!image) {
  //     return "/images/image_not_available.png"
  //   }
  // }

  // console.log(images)

  // async function addProductToCart() {
  //   const {
  //     data: {
  //       addProductToCart: { success },
  //     },
  //   } = await addProductToCartMutation({
  //     variables: {
  //       productId: _id,
  //     },
  //   })

  //   client.cache.evict({ fieldName: "getCartProducts" })

  // }

  async function addProductToCart() {
    await addProduct({
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
    <div className={`card ${grid ?? ""} ${classModifier ? "card--shop" : ""}`}>
      <div
        className="card__image"
        style={{
          background: `url(${
            image ?? "/images/image_not_available.png"
          }) no-repeat`,
        }}
      ></div>

      <div className="card__tags">
        <div className="card__tags__brand">{brandName}</div>
        <div className="card__tags__name">{name}</div>
        <div className="card__tags__price">{price}$</div>
      </div>

      {grid && description && <div className="description">{description}</div>}

      <div className="card__actions">
        <Button
          // altClass="card_link"
          text="View Product"
          href={`/product/${_id}`}
          classModifier={"addToCart"}
        />

        {session && (
          <Button
            onClick={() => {
              session ? addProductToCart() : console.log("you need to log in")
            }}
            disabled={loading}
            icon={faShoppingBag}
            classModifier={"bag"}
          />
        )}
      </div>
    </div>
  )
}
