import { Field, InputType } from "type-graphql"
import { IsPositive, Min, Max, ValidateNested } from "class-validator"
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
  publish: boolean

  @Field(() => [ImageInput], { nullable: true })
  @ValidateNested()
  images?: ImageInput[]

  @Field({ nullable: false })
  wood: ObjectId

  @Field({ nullable: false })
  brand: ObjectId
}
