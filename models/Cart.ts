import { prop as Property, getModelForClass } from "@typegoose/typegoose"
import { ObjectId } from "mongodb"
import { Field, ObjectType } from "type-graphql"
import mongoose from "mongoose"

@ObjectType({ description: "Cart" })
export class Cart {
  @Field()
  readonly _id: ObjectId

  @Field({ nullable: false })
  @Property({ required: true })
  name!: string

  @Field({ nullable: false })
  @Property({ required: true })
  userId!: ObjectId

  @Field({ nullable: false })
  @Property({ required: true })
  productId!: ObjectId

  @Field({ nullable: false })
  @Property({ required: true })
  quantity!: number

  @Field({ nullable: false })
  @Property({ required: true })
  price!: number

  @Field({ nullable: true })
  @Property({ required: false })
  image!: string
}

if (mongoose.models.Cart) {
  delete mongoose.models.Cart
}

export const CartModel = getModelForClass(Cart)
