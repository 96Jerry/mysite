import { Body, Header } from "@nestjs/common";
import { BoardController } from "../board.controller";
import { BoardService } from "../board.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Board } from "../entities/board.entity";
import { User } from "../../user/entities/user.entity";

class MockBoardRepository {
  mydb = [
    {
      number: 5,
      title: "제목5",
      content: "내용5",
      createdAt: "2023-01-05",
      user: { userId: "철수" },
      views: 5,
      image: "http://5",
    },
    {
      number: 1,
      title: "제목1",
      content: "내용1",
      createdAt: "2023-01-01",
      user: { userId: "영희" },
      views: 1,
      image: "http://1",
    },
    {
      number: 2,
      title: "제목2",
      content: "내용2",
      createdAt: "2023-01-02",
      user: { userId: "영희" },
      views: 2,
      image: "http://2",
    },
  ];
  find({ order: { createdAt: x } }) {
    if (x === "ASC") {
      return this.mydb.sort(
        (b, a) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  }
}

class MockUserRepository {}

describe("BoardService", () => {
  let boardService: BoardService;

  beforeEach(async () => {
    const boardModule: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        BoardService,
        {
          provide: getRepositoryToken(Board),
          useClass: MockBoardRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    boardService = boardModule.get<BoardService>(BoardService);
  });

  describe("findAll", () => {
    it("정렬해서 출력이 잘 되는지 확인", async () => {
      const result = await boardService.findAll();
      const expected = [
        {
          number: 1,
          title: "제목1",
          content: "내용1",
          createdAt: "2023-01-01",
          user: { userId: "영희" },
          views: 1,
          image: "http://1",
        },
        {
          number: 2,
          title: "제목2",
          content: "내용2",
          createdAt: "2023-01-02",
          user: { userId: "영희" },
          views: 2,
          image: "http://2",
        },
        {
          number: 5,
          title: "제목5",
          content: "내용5",
          createdAt: "2023-01-05",
          user: { userId: "철수" },
          views: 5,
          image: "http://5",
        },
      ];
      expect(result).toStrictEqual(expected);
    });
  });
});
