import { Field, InputType } from "type-graphql"
import { IsPositive, Min, Max } from "class-validator"
import { ObjectId } from "mongodb"

@InputType()
export class AddToCartInput {
  @Field({ nullable: false })
  productId!: ObjectId

  @IsPositive()
  @Min(1)
  @Max(5)
  @Field({ nullable: false })
  quantity!: number
}
