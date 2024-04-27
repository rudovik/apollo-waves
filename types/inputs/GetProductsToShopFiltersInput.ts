import { InputType, Field } from "type-graphql"
import { ObjectId } from "mongoose"
import { ObjectIdScalar } from "../scalars/ObjectIdScalar"
import { PriceInput } from "./PriceInput"
import { ArrayContains, ArrayMaxSize, ArrayNotEmpty } from "class-validator"
import { ValidateNested } from "class-validator"

@InputType()
export class GetProductsToShopFiltersInput {
  @ValidateNested()
  @Field((type) => PriceInput, { nullable: true })
  price?: PriceInput

  @ArrayMaxSize(20)
  @Field((type) => [ObjectIdScalar], { nullable: true })
  wood?: ObjectId[]

  @ArrayNotEmpty()
  @ArrayMaxSize(4)
  @Field((type) => [Number], { nullable: true })
  frets?: number[]

  @ArrayMaxSize(20)
  @Field((type) => [ObjectIdScalar], { nullable: true })
  brand?: ObjectId[]
}
