import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> //
  ) {}
  async create({ createUserInput }) {
    return (await this.userRepository.save(createUserInput))
      ? "success"
      : "fail";
  }
  delete({ userId }) {}

  find({ currentUser }) {
    // console.log(currentUser);
    return currentUser.userId;
  }
}
