import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BoardService } from "./board.service";
import { Board } from "./entities/board.entity";
import { CreateBoardInput } from "./dto/createboard.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { CurrentUser } from "src/commons/auth/gql-user.param";

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService //
  ) {}

  @Query(() => [Board])
  fetchBoards() {
    return this.boardService.findAll();
  }

  @Query(() => Board)
  fetchBoard(
    @Args("id") id: string //
  ) {
    return this.boardService.find({ id });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  createBoard(
    @Args("board") board: CreateBoardInput, //
    @CurrentUser() currentUser: any
  ) {
    return this.boardService.create({ board, currentUser });
  }

  @Mutation(() => Board)
  updateBoard(
    @Args("id") id: string,
    @Args("board") board: CreateBoardInput //
  ) {
    return this.boardService.update({ id, board });
  }

  @Mutation(() => String)
  deleteBoard(
    @Args("id") id: string //
  ) {
    return this.boardService.delete({ id });
  }
}
