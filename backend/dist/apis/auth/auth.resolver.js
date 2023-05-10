"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const createUser_input_1 = require("../user/dto/createUser.input");
const auth_service_1 = require("./auth.service");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../commons/auth/gql-auth.guard");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const gql_user_param_1 = require("../../commons/auth/gql-user.param");
let AuthResolver = class AuthResolver {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    isLoggedin() {
        return true;
    }
    async login(user, context) {
        const dbUser = await this.userService.findOne({ user });
        const checkUser = await bcrypt.compare(user.userPwd, dbUser.userPwd);
        let accessToken, refreshToken;
        if (checkUser) {
            accessToken = await this.authService.setAccessToken({ user });
            refreshToken = await this.authService.setRefreshToken({ user });
        }
        else {
            return "fail";
        }
        context.res.setHeader("set-cookie", [
            `accessToken=Bearer ${accessToken}; samesite=none; secure; path=/;`,
            `refreshToken=${refreshToken}; samesite=none; secure; path=/;`,
        ]);
        return "success";
    }
    async restoreAccessToken(currentUser, context) {
        const accessToken = await this.authService.setAccessToken({
            user: currentUser,
        });
        context.res.setHeader("set-cookie", `accessToken=Bearer ${accessToken}; path=/;`);
    }
};
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    (0, graphql_1.Query)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "isLoggedin", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)("user")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_input_1.createUserInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthRefreshGuard),
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, gql_user_param_1.CurrentUser)()),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "restoreAccessToken", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map