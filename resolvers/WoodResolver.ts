import { Arg, Mutation, Resolver, Query, UseMiddleware } from "type-graphql"
import { WoodModel } from "models/Wood"
import { Wood } from "models/Wood"
import { GenericResponse } from "types/responses/GenericResponse"
import { isAuth } from "middlewares/isAuth"
import { isAdmin } from "middlewares/isAdmin"

@Resolver()
export class WoodResolver {
  @Query(() => [Wood], { nullable: "items" })
  async getAllWoods(): Promise<Wood[]> {
    const woods = await WoodModel.find({})
    return woods ?? []
  }

  @Mutation(() => GenericResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async addWood(@Arg("name") name: string): Promise<GenericResponse> {
    const wood = new WoodModel({ name })
    await wood.save()

    return { success: true }
  }

  @Mutation(() => GenericResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async deleteWood(@Arg("name") name: string): Promise<GenericResponse> {
    await WoodModel.findOneAndDelete({ name })

    return { success: true }
  }
}
