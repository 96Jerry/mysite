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
exports.BoardResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const board_service_1 = require("./board.service");
const board_entity_1 = require("./entities/board.entity");
const createBoard_input_1 = require("./dto/createBoard.input");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../../commons/auth/gql-auth.guard");
const gql_user_param_1 = require("../../commons/auth/gql-user.param");
let BoardResolver = class BoardResolver {
    constructor(boardService) {
        this.boardService = boardService;
    }
    fetchBoards() {
        return this.boardService.findAll();
    }
    fetchBoard(id) {
        return this.boardService.find({ id });
    }
    createBoard(board, currentUser) {
        return this.boardService.create({ board, currentUser });
    }
    searchBoard(searchInput) {
        return this.boardService.searchTitle({ title: searchInput });
    }
    updateBoard(id, board) {
        return this.boardService.update({ id, board });
    }
    deleteBoard(id) {
        return this.boardService.delete({ id });
    }
};
__decorate([
    (0, graphql_1.Query)(() => [board_entity_1.Board]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "fetchBoards", null);
__decorate([
    (0, graphql_1.Query)(() => board_entity_1.Board),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "fetchBoard", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    (0, graphql_1.Mutation)(() => board_entity_1.Board),
    __param(0, (0, graphql_1.Args)("board")),
    __param(1, (0, gql_user_param_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBoard_input_1.CreateBoardInput, Object]),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "createBoard", null);
__decorate([
    (0, graphql_1.Query)(() => [board_entity_1.Board]),
    __param(0, (0, graphql_1.Args)("searchInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "searchBoard", null);
__decorate([
    (0, graphql_1.Mutation)(() => board_entity_1.Board),
    __param(0, (0, graphql_1.Args)("id")),
    __param(1, (0, graphql_1.Args)("board")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createBoard_input_1.CreateBoardInput]),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "updateBoard", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "deleteBoard", null);
BoardResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardResolver);
exports.BoardResolver = BoardResolver;
//# sourceMappingURL=board.resolver.js.map