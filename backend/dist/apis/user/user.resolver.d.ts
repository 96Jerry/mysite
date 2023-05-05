import { UserService } from "./user.service";
import { createUserInput } from "./dto/createUser.input";
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    fetchLoginUser(currentUser: any): Promise<string>;
    createUser(createUserInput: createUserInput): Promise<"fail" | "success">;
    deleteUser(userId: string): void;
}
