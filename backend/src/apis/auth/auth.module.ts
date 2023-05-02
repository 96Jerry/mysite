import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtAccessStrategy } from "src/commons/auth/jwt-access.strategy";

@Module({
  imports: [JwtModule.register({})],
  providers: [
    AuthResolver, //
    AuthService,
    JwtAccessStrategy,
  ],
})
export class AuthModule {}
