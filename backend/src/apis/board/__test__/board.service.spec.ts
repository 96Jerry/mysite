import { Body, Header } from "@nestjs/common";
import { BoardController } from "../board.controller";
import { BoardService } from "../board.service";
import { Test, TestingModule } from "@nestjs/testing";

class MockBoardRepository {
  mydb = [
    {
      number: 1,
      title: "제목1",
      content: "내용1",
      createdAt: "2023-01-01",
      userId: "철수",
      views: 1,
      image: "http://1",
    },
    {
      number: 2,
      title: "제목2",
      content: "내용2",
      createdAt: "2023-01-02",
      userId: "영희",
      views: 2,
      image: "http://2",
    },
  ];
  findOne({ where }) {}
}

class MockBoardService {
  hello() {
    return "Hello";
  }
}

describe("BoardController", () => {
  let boardController: BoardController;

  beforeEach(async () => {
    const boardModule: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        {
          provide: BoardService,
          useClass: MockBoardService,
        },
      ],
    }).compile();

    boardController = boardModule.get<BoardController>(BoardController);
  });

  describe("getHello", () => {
    it("이 테스트의 결과는 success를 반환", () => {
      const result = boardController.hello(Body, Header);
      expect(result).toBe("Hello");
    });
  });
});
