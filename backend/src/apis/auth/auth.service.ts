import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async login({ user }) {
    const userData = await this.userRepository.find(user.userId);
    if (userData[0].userPwd === user.userPwd) {
      const JwtToken = this.jwtService.sign(
        { userId: user.userId, userPwd: user.userPwd },
        { expiresIn: "1h", secret: "myAccessKey" }
      );
      return JwtToken;
    } else return "fail";
  }
}
