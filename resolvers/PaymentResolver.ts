import {
  Resolver,
  Query,
  Arg,
  Mutation,
  UseMiddleware,
  Ctx,
} from "type-graphql"
import { isAuth } from "middlewares/isAuth"
import type { RequestContext } from "types/requests/RequestContext"
import { isDocument } from "@typegoose/typegoose"
import { PayPalCreateOrderResponse } from "types/PaypalCreateOrderResponse"
import { PayPalCaptureOrderResponse } from "types/PayPalCaptureOrderResponse"
import { createOrder, captureOrder } from "lib/paypal"
import { PaymentModel } from "models/Payment"
import { ProductModel } from "models/Product"
import { CartModel } from "models/Cart"

@Resolver()
export class PaymentResolver {
  @Mutation(() => PayPalCreateOrderResponse)
  @UseMiddleware(isAuth)
  // @UseMiddleware(isAdmin)
  async createOrder(
    @Ctx() ctx: RequestContext
    // @Arg("cart", (type) => [OrderCartItem]) cart: OrderCartItem[]
  ): Promise<PayPalCreateOrderResponse> {
    const cartItems = await CartModel.find({
      userId: ctx.user._id,
    })

    const total = cartItems.reduce(
      (accumulator, cartItem) => accumulator + cartItem.price,
      0
    )

    try {
      const { jsonResponse } = await createOrder(total)
      // console.log(jsonResponse)
      return jsonResponse
    } catch (error) {
      console.log("Failed to create order: ", error)
    }
  }

  @Mutation(() => PayPalCaptureOrderResponse)
  @UseMiddleware(isAuth)
  async captureOrder(
    @Arg("orderId", (type) => String) orderId: String,
    @Ctx() ctx: RequestContext
  ): Promise<PayPalCaptureOrderResponse> {
    try {
      const { jsonResponse } = await captureOrder(orderId)
      const { id, status } = jsonResponse

      if (status === "COMPLETED") {
        // const start = performance.now()
        await CartModel.deleteMany({ userId: ctx.user._id })
        // const end = performance.now()
        // console.log(end - start)
      } else {
        console.log(jsonResponse)
      }

      const response = { id, status }
      return response
    } catch (error) {
      console.log("Failed to create order: ", error)
    }
  }
}
