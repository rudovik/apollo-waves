import { Field, ObjectType } from "type-graphql"
import { CardBlockItem } from "./CardBlockItem"

@ObjectType()
export class CardBlockItemWithDescription extends CardBlockItem {
  @Field()
  description!: string
}
