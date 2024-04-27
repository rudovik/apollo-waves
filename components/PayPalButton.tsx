"use client"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useMutation } from "@apollo/client"
import {
  CreateOrderDocument,
  CaptureOrderDocument,
  GetCartProductsDocument,
} from "__generated__/graphql"

export default function PayPalButton() {
  const [createOrderMutation, { loading: creatingOrder }] =
    useMutation(CreateOrderDocument)
  const [captureOrderMutation, { loading: capturingOrder }] =
    useMutation(CaptureOrderDocument)

  async function createOrder() {
    const {
      data: {
        createOrder: { id: orderId },
      },
    } = await createOrderMutation()
    return orderId
  }

  async function onApprove(data) {
    const {
      data: {
        captureOrder: { status },
      },
    } = await captureOrderMutation({
      variables: {
        orderId: data.orderID,
      },
      refetchQueries: [GetCartProductsDocument],
      awaitRefetchQueries: true,
    })
  }

  try {
    return (
      <div className="payPalButtonContainer">
        <PayPalScriptProvider
          options={{
            clientId:
              "Ac-eLEgnrdGnZ5Jw_nxzjcp5siC8NXrTSkxr-OA4jpzefywkUemTXZU_F-FDZGJwA2TUOHTKXdbmBX2_",
            currency: "USD",
          }}
        >
          <PayPalButtons
            style={{ layout: "horizontal", color: "blue" }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        </PayPalScriptProvider>
      </div>
    )
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      throw error
    }
  }
}
