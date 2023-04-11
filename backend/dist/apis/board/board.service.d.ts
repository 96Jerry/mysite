import { Repository } from "typeorm";
import { Board } from "./entities/board.entity";
export declare class BoardService {
    private readonly boardRepository;
    constructor(boardRepository: Repository<Board>);
    findAll(): Promise<Board[]>;
    create({ board }: {
        board: any;
    }): Promise<any>;
    find({ id }: {
        id: any;
    }): Promise<Board>;
    update({ id, board }: {
        id: any;
        board: any;
    }): Promise<any>;
    delete({ id }: {
        id: any;
    }): Promise<string>;
}
