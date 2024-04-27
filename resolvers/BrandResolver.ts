import { Arg, Mutation, Resolver, Query, UseMiddleware } from "type-graphql"
import { isAuth } from "middlewares/isAuth"
import { isAdmin } from "middlewares/isAdmin"
import { BrandModel } from "models/Brand"
import { Brand } from "models/Brand"
import { GenericResponse } from "types/responses/GenericResponse"

@Resolver()
export class BrandResolver {
  @Query(() => [Brand], { nullable: "items" })
  async getAllBrands(): Promise<Brand[]> {
    const brands = await BrandModel.find({})
    return brands ?? []
  }

  @Mutation(() => GenericResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async addBrand(@Arg("name") name: string): Promise<GenericResponse> {
    const brand = new BrandModel({ name })
    await brand.save()

    return { success: true }
  }

  @Mutation(() => GenericResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async deleteBrand(@Arg("name") name: string): Promise<GenericResponse> {
    await BrandModel.findOneAndDelete({ name })

    return { success: true }
  }
}
