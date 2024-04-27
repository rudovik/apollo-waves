import { Field, ObjectType } from "type-graphql"
import { ObjectId } from "mongodb"

@ObjectType()
export class CartItem {
  @Field()
  readonly _id?: ObjectId

  @Field()
  userId!: ObjectId

  @Field()
  productId!: ObjectId

  @Field({ nullable: false })
  name!: string

  @Field({ nullable: false })
  quantity!: number

  @Field()
  price!: number

  @Field({ nullable: true })
  image!: string
}
