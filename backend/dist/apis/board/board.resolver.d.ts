import { BoardService } from "./board.service";
import { Board } from "./entities/board.entity";
import { CreateBoardInput } from "./dto/createboard.input";
export declare class BoardResolver {
    private readonly boardService;
    constructor(boardService: BoardService);
    fetchBoards(): Promise<Board[]>;
    fetchBoard(id: string): Promise<Board>;
    createBoard(board: CreateBoardInput): Promise<any>;
    updateBoard(id: string, board: CreateBoardInput): Promise<any>;
    deleteBoard(id: string): Promise<string>;
}
