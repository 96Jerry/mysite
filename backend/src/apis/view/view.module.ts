import { TypeOrmModule } from "@nestjs/typeorm";
import { View } from "./entities/view.entity";
import { ViewResolver } from "./view.resolver";
import { ViewService } from "./view.service";
import { Module } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { Board } from "../board/entities/board.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([View, User, Board]), //
  ],
  providers: [
    ViewResolver, //
    ViewService,
  ],
})
export class ViewModule {}
