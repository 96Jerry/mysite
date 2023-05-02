import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { createUserInput } from "./dto/createUser.input";

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService //
  ) {}
  @Mutation(() => String)
  createUser(
    @Args("createUserInput") createUserInput: createUserInput //
  ) {
    return this.userService.create({ createUserInput });
  }

  @Mutation(() => String)
  deleteUser(@Args("userId") userId: string) {
    return this.userService.delete({ userId });
  }
}
