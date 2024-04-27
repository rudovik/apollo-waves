import { MiddlewareFn } from "type-graphql"
import { RequestContext } from "types/requests/RequestContext"

export const isAdmin: MiddlewareFn<RequestContext> = async (
  { context },
  next
) => {
  if (context.user.role !== "admin") throw new Error("You're not an admin!")
  return next()
}
