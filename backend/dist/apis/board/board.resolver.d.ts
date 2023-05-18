import { BoardService } from "./board.service";
import { Board } from "./entities/board.entity";
import { CreateBoardInput } from "./dto/createBoard.input";
export declare class BoardResolver {
    private readonly boardService;
    constructor(boardService: BoardService);
    fetchBoards(): Promise<Board[]>;
    fetchBoard(id: string): Promise<Board>;
    createBoard(board: CreateBoardInput, currentUser: any): Promise<any>;
    searchBoard(searchInput: string): Promise<Board[]>;
    updateBoard(id: string, board: CreateBoardInput): Promise<any>;
    deleteBoard(id: string): Promise<string>;
}
