import { Module } from "@nestjs/common";
import { BoardResolver } from "./board.resolver";
import { BoardService } from "./board.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "./entities/board.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardResolver, BoardService],
  // controllers: [BoardController],
})
export class BoardModule {}
