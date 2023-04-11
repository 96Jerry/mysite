import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Board } from "./entities/board.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board> //
  ) {}

  async findAll() {
    return await this.boardRepository.find({ order: { CreatedAt: "ASC" } });
  }
  async create({ board }) {
    return await this.boardRepository.save(board);
  }

  async find({ id }) {
    return await this.boardRepository.findOne({
      where: { id: id },
      order: { CreatedAt: "ASC" },
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
