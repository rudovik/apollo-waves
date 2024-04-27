import { Field, ObjectType } from "type-graphql"
import { ObjectId } from "mongodb"

@ObjectType()
export class ProductCartItem {
  @Field()
  readonly _id!: ObjectId

  @Field({ nullable: false })
  price!: number

  @Field({ nullable: false })
  name!: string

  @Field({ nullable: false })
  shipping!: boolean

  @Field({ nullable: true })
  image!: string
}
