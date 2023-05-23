import { User } from "src/apis/user/entities/user.entity";
export declare class Board {
    id: string;
    number: number;
    title: string;
    content: string;
    views: number;
    image: string;
    createdAt: Date;
    user: User;
}
