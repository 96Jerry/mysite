import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtAccessStrategy } from "src/commons/auth/jwt-access.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { JwtRefreshStrategy } from "src/commons/auth/jwt-refresh.strategy";
import { AuthController } from "./auth.controller";
import { NaverStrategy } from "src/commons/auth/naver.strategy";

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthResolver, //
    AuthService,
    UserService,
    JwtRefreshStrategy,
    NaverStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
