import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { createUserInput } from "./dto/createUser.input";
import { CurrentUser } from "src/commons/auth/gql-user.param";
import { UseGuards } from "@nestjs/common";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { User } from "./entities/user.entity";

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService //
  ) {}
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchLoginUser(
    @CurrentUser() currentUser: any //
  ) {
    return this.userService.find({ currentUser });
  }

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
