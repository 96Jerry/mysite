import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create({ createUserInput }: {
        createUserInput: any;
    }): Promise<any>;
    delete({ userId }: {
        userId: any;
    }): void;
    findOne({ user }: {
        user: any;
    }): Promise<User>;
}
