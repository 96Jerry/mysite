"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const board_module_1 = require("./apis/board/board.module");
const typeorm_1 = require("@nestjs/typeorm");
const dotenv = require("dotenv");
const user_module_1 = require("./apis/user/user.module");
const auth_module_1 = require("./apis/auth/auth.module");
const view_module_1 = require("./apis/view/view.module");
const file_module_1 = require("./apis/file/file.module");
dotenv.config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            file_module_1.FileModule,
            view_module_1.ViewModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            board_module_1.BoardModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: "127.0.0.1",
                port: 3306,
                username: "root",
                password: process.env.MYSQL_PASSWORD,
                database: "mysite",
                entities: [__dirname + "/apis/**/*.entity.*"],
                synchronize: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: "src/commons/graphql/schema.gql",
                context: ({ req, res }) => ({ req, res }),
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map