import { createUserInput } from "../user/dto/createUser.input";
import { AuthService } from "./auth.service";
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: createUserInput, context: any): Promise<"fail" | "success">;
}
