import { createUserInput } from "../user/dto/createUser.input";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
export declare class AuthResolver {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    isLoggedin(): boolean;
    login(user: createUserInput): Promise<string>;
    restoreAccessToken(currentUser: any, context: any): Promise<void>;
}
