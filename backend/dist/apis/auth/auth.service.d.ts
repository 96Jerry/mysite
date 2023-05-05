import { JwtService } from "@nestjs/jwt";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
export declare class AuthService {
    private readonly jwtService;
    private readonly userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    setAccessToken({ user }: {
        user: any;
    }): Promise<string>;
    setRefreshToken({ user }: {
        user: any;
    }): Promise<string>;
}
