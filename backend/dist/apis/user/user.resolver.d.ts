import { UserService } from "./user.service";
import { createUserInput } from "./dto/createUser.input";
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    fetchLoginUser(currentUser: any): any;
    createUser(createUserInput: createUserInput): Promise<"success" | "fail">;
    deleteUser(userId: string): void;
}
