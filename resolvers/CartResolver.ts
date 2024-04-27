import {
  Arg,
  Mutation,
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
} from "type-graphql"
import { CartModel } from "models/Cart"
import { GenericResponse } from "types/responses/GenericResponse"
import { isAuth } from "middlewares/isAuth"
import type { RequestContext } from "types/requests/RequestContext"
import { AddToCartInput } from "types/inputs/AddToCartInput"
import { mongoose } from "@typegoose/typegoose"
import { CartItem } from "types/responses/CartItem"
import { ObjectId } from "mongodb"
import { ProductModel } from "models/Product"

@Resolver()
export class CartResolver {
  @Query(() => [CartItem], { nullable: "items" })
  @UseMiddleware(isAuth)
  async getCartProducts(@Ctx() ctx: RequestContext): Promise<CartItem[]> {
    const cartItems = await CartModel.find({
      userId: ctx.user._id,
    })

    return cartItems
  }

  @Mutation(() => GenericResponse)
  @UseMiddleware(isAuth)
  async addToCart(
    @Arg("input", { nullable: false })
    { productId, quantity }: AddToCartInput,
    @Ctx() ctx: RequestContext
  ): Promise<GenericResponse> {
    const userId = ctx.user._id

    const existedCartItem = await CartModel.findOne({ userId, productId })
    if (existedCartItem) {
      existedCartItem.quantity += quantity
      await existedCartItem.save()
    } else {
      const product = await ProductModel.findOne({ _id: productId })
      if (!product) return { success: false }

      const image =
        (product.images && product.images[0] && product.images[0].url) || null

      const { name, price } = product

      const cartItem = new CartModel<CartItem>({
        quantity,
        userId,
        name: name,
        price: price,
        image,
        productId,
      })

      await cartItem.save()
    }

    return { success: true }
  }

  @Mutation(() => GenericResponse)
  @UseMiddleware(isAuth)
  async removeFromCart(
    @Arg("productId", { nullable: false })
    productId: ObjectId,
    @Ctx() ctx: RequestContext
  ): Promise<GenericResponse> {
    const userId = ctx.user._id

    await CartModel.findOneAndDelete({
      userId,
      productId,
    })

    return { success: true }
  }
}
