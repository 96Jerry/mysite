import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from "@nestjs/graphql";
import { createUserInput } from "../user/dto/createUser.input";
import { AuthService } from "./auth.service";
import { UseGuards } from "@nestjs/common";
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from "src/commons/auth/gql-auth.guard";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { CurrentUser } from "src/commons/auth/gql-user.param";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UserService
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Boolean)
  isLoggedin() {
    return true;
  }

  @Mutation(() => String)
  async login(
    @Args("user") user: createUserInput //
  ) {
    const dbUser = await this.userService.findOne({ user });
    const checkUser = await bcrypt.compare(user.userPwd, dbUser.userPwd);

    let accessToken: string, refreshToken: string;
    if (checkUser) {
      accessToken = await this.authService.setAccessToken({ user });
      refreshToken = await this.authService.setRefreshToken({ user });
    } else {
      return "fail";
    }
    return `accessToken=Bearer ${accessToken}`;
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  async restoreAccessToken(
    @CurrentUser() currentUser: any,
    @Context() context: any
  ) {
    const accessToken = await this.authService.setAccessToken({
      user: currentUser,
    });
    context.res.setHeader(
      "set-cookie",
      `accessToken=Bearer ${accessToken}; path=/;`
    );
  }
}
