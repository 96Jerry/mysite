import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> //
  ) {}
  async create({ createUserInput }) {
    const hasedUserPwd = await bcrypt.hash(createUserInput.userPwd, 10);
    createUserInput.userPwd = hasedUserPwd;

    return (await this.userRepository.save(createUserInput))
      ? "success"
      : "fail";
  }
  delete({ userId }) {}

  async findOne({ user }) {
    // console.log(currentUser);
    return await this.userRepository.findOne({
      where: { userId: user.userId },
    });
  }
}
