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
    @Args("user") user: createUserInput, //
    @Context() context: any
  ) {
    // 1. 유저 아이디를 데이터베이스에서 조회
    const dbUser = await this.userService.findOne({ user });
    // 2. 유저 비밀번호를 데이터베이스에서 조회
    // 3. 입력받은 비밀번호와 데이터베이스의 비밀번호를 비교, 일치하면 accessToken, refreshToken 발급
    const checkUser = await bcrypt.compare(user.userPwd, dbUser.userPwd);

    let accessToken: string, refreshToken: string;
    if (checkUser) {
      accessToken = await this.authService.setAccessToken({ user });
      refreshToken = await this.authService.setRefreshToken({ user });
    } else {
      return "fail";
    }
    context.res.setHeader("set-cookie", [
      `accessToken=Bearer ${accessToken}; path=/; httponly; secure;`,
      `refreshToken=${refreshToken}; path=/; httponly; secure;`,
    ]);

    return "success";
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
    // console.log(accessToken);
    // console.log("================");
    context.res.setHeader(
      "set-cookie",
      `accessToken=Bearer ${accessToken}; path=/;`
    );
  }
}
