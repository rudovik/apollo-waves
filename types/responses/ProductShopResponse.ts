import { ObjectType, Field } from "type-graphql"
import { CardBlockItemWithDescription } from "types/responses/CardBlockItemWithDesription"

@ObjectType()
export class ProductShopResponse {
  @Field()
  size: number

  @Field()
  total: number

  @Field(() => [CardBlockItemWithDescription], { nullable: "items" })
  products: CardBlockItemWithDescription[]
}
