import { Field, InputType } from "type-graphql"
import { IsPositive, Min, Max } from "class-validator"

@InputType()
export class PriceInput {
  @Min(0)
  @Field({ nullable: false })
  gte!: number

  @IsPositive()
  @Max(150000)
  @Field({ nullable: false })
  lte!: number
}
