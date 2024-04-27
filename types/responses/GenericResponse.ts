import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class GenericResponse {
  @Field()
  success: boolean
}
