import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  // async login({ user }) {
  //   const userData = await this.userRepository.findOne({
  //     where: { userId: user.userId },
  //   });
  //   // console.log(userData);
  //   const isAuth = await bcrypt.compare(user.userPwd, userData.userPwd);
  //   if (isAuth) {
  //     const JwtToken = this.jwtService.sign(
  //       { userId: user.userId, userPwd: userData.userPwd },
  //       { expiresIn: "30m", secret: "myAccessKey" }
  //     );
  //     return JwtToken;
  //   } else return "fail";
  // }
  async setAccessToken({ user }) {
    const AccessToken = this.jwtService.sign(
      { userId: user.userId, userPwd: user.userPwd },
      { expiresIn: "30m", secret: "myAccessKey" }
    );
    return AccessToken;
  }
  async setRefreshToken({ user }) {
    const refreshToken = this.jwtService.sign(
      { userId: user.userId, userPwd: user.userPwd },
      { expiresIn: "2w", secret: "myRefreshKey" }
    );
    return refreshToken;
  }
}
