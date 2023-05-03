import { Repository } from "typeorm";
import { Board } from "./entities/board.entity";
import { User } from "../user/entities/user.entity";
export declare class BoardService {
    private readonly boardRepository;
    private readonly userRepository;
    constructor(boardRepository: Repository<Board>, userRepository: Repository<User>);
    findAll(): Promise<Board[]>;
    create({ board, currentUser }: {
        board: any;
        currentUser: any;
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
