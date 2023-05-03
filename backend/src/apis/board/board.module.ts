import { Module } from "@nestjs/common";
import { BoardResolver } from "./board.resolver";
import { BoardService } from "./board.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "./entities/board.entity";
import { JwtAccessStrategy } from "src/commons/auth/jwt-access.strategy";
import { User } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Board, User])],
  providers: [BoardResolver, BoardService, JwtAccessStrategy],
  // controllers: [BoardController],
})
export class BoardModule {}
