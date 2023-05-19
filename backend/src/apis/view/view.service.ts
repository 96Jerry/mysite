import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { View } from "./entities/view.entity";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { Board } from "../board/entities/board.entity";

@Injectable()
export class ViewService {
  constructor(
    @InjectRepository(View)
    private readonly viewRepository: Repository<View>, //
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>
  ) {}

  // 조회수 증가만 해주면 되고 조회는 알아서 할 수 있다.
  async create({ boardId, currentUser }) {
    const user = await this.userRepository.findOne({
      where: { userId: currentUser.userId },
    });

    // 1. view 테이블에 현재 로그인한 유저가 현재 보고있는 게시물을 조회한 적이 있는지 확인한다.
    const viewed = await this.viewRepository.find({ where: { user } });

    for (let i = 0; i < viewed.length; i++) {
      if (boardId === viewed[i].boardId) {
        // 본적이 있다면 바로 나가기 아무것도 안하고

        return 0;
      }
    }
    // 본적이 없다면 게시물 조회수 조회, 1더해주기, 1 return 해주기
    let board = await this.boardRepository.findOne({
      where: { id: boardId },
    });
    await this.viewRepository.save({
      user,
      boardId,
    });
    const { views, ...rest } = board;

    const newViews = views + 1;

    board = await this.boardRepository.save({ ...rest, views: newViews });

    return 1;
  }
}
