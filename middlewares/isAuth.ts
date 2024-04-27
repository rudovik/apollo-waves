import { MiddlewareFn } from "type-graphql"
import { RequestContext } from "types/requests/RequestContext"
// import { UserModel } from "models/User"
// import { authOptions } from "lib/prisma/authOptions"
// import { getServerSession } from "next-auth"
import { auth } from "lib/auth/nextAuth"

export const isAuth: MiddlewareFn<RequestContext> = async (
  { context },
  next
) => {
  try {
    const { user } = await auth()
    context.user = {}
    context.user.role = user.role
    context.user._id = user.id
  } catch (error) {
    throw Error("You're not authorized!")
  }

  return next()
}
