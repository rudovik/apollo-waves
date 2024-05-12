import {
  Resolver,
  Query,
  registerEnumType,
  Arg,
  Mutation,
  UseMiddleware,
} from "type-graphql"
import { ProductModel } from "models/Product"
import { CardBlockItem } from "types/responses/CardBlockItem"
import { Brand } from "models/Brand"
import { ProductShopResponse } from "types/responses/ProductShopResponse"
import { GetProductsToShopFiltersInput } from "types/inputs/GetProductsToShopFiltersInput"
import type { SortOrder } from "types/scalars/sortOrderScalar"
import { SortOrderScalar } from "types/scalars/sortOrderScalar"
import { ObjectId } from "mongodb"
import { AddProductInput } from "types/inputs/AddProductInput"
import { Wood } from "models/Wood"
import { Product } from "models/Product"
import { isDocument, Ref } from "@typegoose/typegoose"
import { GenericResponse } from "types/responses/GenericResponse"
import { isAdmin } from "middlewares/isAdmin"
import { isAuth } from "middlewares/isAuth"

enum SortBy {
  sold = "sold",
  createdAt = "createdAt",
  _id = "_id",
}

registerEnumType(SortBy, {
  name: "SortBy",
  description: "Allowable sort by values",
})

@Resolver()
export class ProductResolver {
  @Query(() => [CardBlockItem], { nullable: true })
  async getCardBlockItems(
    @Arg("sortBy", () => SortBy, { nullable: false }) sortBy: SortBy
  ): Promise<CardBlockItem[]> {
    const cardBlockItems = await ProductModel.find<CardBlockItem>(
      {},
      {
        image: { $first: "$images.url" },
        name: 1,
        price: 1,
        brand: 1,
      }
    )
      .populate<{ brand: Brand }>("brand")
      .sort([[sortBy, "desc"]])
      .limit(4)

    return cardBlockItems
  }

  @Query(() => Product, { nullable: true })
  async getProductById(
    @Arg("_id", () => ObjectId, { nullable: false }) _id: ObjectId
  ): Promise<Product> {
    const product = await ProductModel.findOne<Product>({ _id })
      .populate<{ brand: Ref<Brand> }>("brand")
      .populate<{ wood: Ref<Wood> }>("wood")

    if (product && isDocument(product.wood) && isDocument(product.brand)) {
      return product
    } else {
      return null
    }
  }

  @Query(() => ProductShopResponse)
  async getProductsToShop(
    @Arg("filters", { nullable: true })
    filters?: GetProductsToShopFiltersInput,
    @Arg("order", () => SortOrderScalar, { nullable: true })
    order?: SortOrder,
    @Arg("sortBy", () => SortBy, { nullable: true })
    sortBy?: SortBy,
    @Arg("limit", { nullable: true }) limit?: number,
    @Arg("skip", { nullable: true }) skip?: number
  ): Promise<ProductShopResponse> {
    const { price, wood, brand, frets } = filters

    const queryFilters: any = {}
    if (price)
      queryFilters.price = { $gte: filters.price.gte, $lte: filters.price.lte }
    if (wood) queryFilters.wood = { $in: wood }
    if (brand) queryFilters.brand = { $in: brand }
    if (frets) queryFilters.frets = { $in: frets }

    const sortOperator = { $sort: {} }
    sortOperator["$sort"][sortBy ?? SortBy._id] = order ?? -1

    const [{ products, total }] =
      await ProductModel.aggregate<ProductShopResponse>([
        { $match: queryFilters },
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "_id",
            as: "brand",
          },
        },
        {
          $project: {
            name: 1,
            price: 1,
            brand: { $first: "$brand" },
            description: 1,
            image: { $ifNull: [{ $first: "$images.url" }, null] },
          },
        },
        {
          $facet: {
            total: [
              {
                $count: "count",
              },
            ],
            products: [
              sortOperator,
              { $skip: skip ?? 0 },
              { $limit: limit ?? 6 },
            ],
          },
        },
        {
          $project: {
            products: 1,
            total: { $ifNull: [{ $first: "$total.count" }, 0] },
          },
        },
      ])

    // console.log("skip = " + skip)
    // console.log("total = " + total)
    // console.log("size = " + products.length)

    return {
      products,
      size: products.length,
      total,
    }
  }

  @Mutation(() => GenericResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async addProduct(
    @Arg("input", { nullable: false })
    productInput: AddProductInput
  ): Promise<GenericResponse> {
    const product = new ProductModel({
      ...productInput,
    })

    await product.save()

    return { success: true }
  }
}
