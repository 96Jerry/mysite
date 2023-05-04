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
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService //
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
    // 1. 유저가 데이터베이스에 존재하면 토큰을 쿠키에 넣어줌
    const jwtToken = await this.authService.login({ user });
    if (jwtToken === "fail") return "fail";
    else {
      // context.res.setHeader("Access-Control-Allow-Credentials", "true");
      // context.res.setHeader("Access-Control-Allow-Headers", "content-type");
      // context.res.setHeader("Access-Control-Allow-Methods", "post");

      context.res.setHeader("Set-Cookie", `Bearer ${jwtToken}; path=/;`);
      return "success";
    }
  }
}
