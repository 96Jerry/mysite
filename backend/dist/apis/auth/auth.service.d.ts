import { JwtService } from "@nestjs/jwt";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
export declare class AuthService {
    private readonly jwtService;
    private readonly userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    login({ user }: {
        user: any;
    }): Promise<string>;
}
