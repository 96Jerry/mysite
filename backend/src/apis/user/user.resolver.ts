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
  // 현재 발급받은 토큰으로 유저 아이디를 조회 api
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  async fetchLoginUser(
    @CurrentUser() currentUser: any //
  ) {
    const user = await this.userService.findOne({ user: currentUser });
    return user.userId;
  }

  // 회원가입 api
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
