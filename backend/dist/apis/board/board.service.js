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
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const board_entity_1 = require("./entities/board.entity");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
let BoardService = class BoardService {
    constructor(boardRepository, userRepository) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }
    async findAll() {
        const a = await this.boardRepository.find({
            order: { createdAt: "ASC" },
        });
        return a;
    }
    async create({ board, currentUser }) {
        const user = await this.userRepository.findOne({
            where: { userId: currentUser.userId },
        });
        return await this.boardRepository.save(Object.assign(Object.assign({}, board), { user }));
    }
    async find({ id }) {
        return await this.boardRepository.findOne({
            where: { id: id },
            order: { createdAt: "ASC" },
            relations: ["user"],
        });
    }
    async update({ id, board }) {
        return await this.boardRepository.save(Object.assign({ id }, board));
    }
    async delete({ id }) {
        await this.boardRepository.delete({ id });
        return "삭제완료";
    }
};
BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(board_entity_1.Board)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], BoardService);
exports.BoardService = BoardService;
//# sourceMappingURL=board.service.js.map