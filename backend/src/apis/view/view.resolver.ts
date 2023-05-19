import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/commons/auth/gql-user.param";
import { ViewService } from "./view.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { View } from "./entities/view.entity";

@Resolver()
export class ViewResolver {
  constructor(
    private readonly viewService: ViewService //
  ) {}

  // 조회수를 조회하는 api
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Int)
  click(
    @Args("boardId") boardId: string,
    @CurrentUser() currentUser: any //
  ) {
    return this.viewService.create({ boardId, currentUser });
  }
}
