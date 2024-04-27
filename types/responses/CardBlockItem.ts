import { Field, ObjectType } from "type-graphql"
import { ObjectId } from "mongodb"
import { Brand } from "models/Brand"

@ObjectType()
export class CardBlockItem {
  @Field()
  readonly _id!: ObjectId

  @Field({ nullable: true })
  image!: string

  @Field()
  brand!: Brand

  @Field()
  name!: string

  @Field()
  price!: number
}
