import { Field, InputType } from "type-graphql"
import { IsPositive, Min, Max } from "class-validator"
import { ObjectId } from "mongodb"
import { ImageInput } from "./ImageInput"

@InputType({ description: "Product Input" })
export class AddProductInput {
  @Field({ nullable: false })
  name: string

  @Field({ nullable: false })
  description: string

  @Field({ nullable: false })
  price: number

  @Field({ nullable: false })
  shipping: boolean

  @Field({ nullable: false })
  available: boolean

  @Field({ nullable: false })
  frets: number

  @Field({ nullable: false })
  sold: number

  @Field({ nullable: false })
  publish: boolean

  @Field(() => [ImageInput], { nullable: true })
  images?: ImageInput[]

  @Field({ nullable: false })
  wood: ObjectId

  @Field({ nullable: false })
  brand: ObjectId
}
