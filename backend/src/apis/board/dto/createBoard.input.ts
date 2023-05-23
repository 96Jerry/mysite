import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateBoardInput {
  @Field(() => Int)
  number: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  image: string;
}
