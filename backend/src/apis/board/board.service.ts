import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Board } from "./entities/board.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>, //
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll() {
    const a = await this.boardRepository.find({
      order: { createdAt: "ASC" },
    });

    return a;
  }
  async create({ board, currentUser }) {
    // console.log(currentUser);
    const user = await this.userRepository.findOne({
      where: { userId: currentUser.userId },
    });
    // console.log(user);
    return await this.boardRepository.save({ ...board, user });
  }

  async find({ id }) {
    return await this.boardRepository.findOne({
      where: { id: id },
      order: { createdAt: "ASC" },
      relations: ["user"], // 이메일 설정 오류로 인한 커밋2
    });
  }

  async update({ id, board }) {
    return await this.boardRepository.save({ id, ...board });
  }

  async delete({ id }) {
    await this.boardRepository.delete({ id });
    return "삭제완료";
  }
}
