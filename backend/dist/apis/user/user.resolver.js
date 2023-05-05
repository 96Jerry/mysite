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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("./user.service");
const createUser_input_1 = require("./dto/createUser.input");
const gql_user_param_1 = require("../../commons/auth/gql-user.param");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../commons/auth/gql-auth.guard");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async fetchLoginUser(currentUser) {
        const user = await this.userService.findOne({ user: currentUser });
        return user.userId;
    }
    createUser(createUserInput) {
        return this.userService.create({ createUserInput });
    }
    deleteUser(userId) {
        return this.userService.delete({ userId });
    }
};
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    (0, graphql_1.Query)(() => String),
    __param(0, (0, gql_user_param_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "fetchLoginUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)("createUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_input_1.createUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map