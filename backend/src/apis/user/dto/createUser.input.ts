import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createUserInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  userPwd: string;
}
