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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionsDto = exports.PositionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class PositionDto {
    static of(info) {
        return {
            createdAt: info.createdAt,
            updatedAt: info.updatedAt,
            owner: info.owner,
            positionId: info.positionId,
            positionType: info.positionType,
            margin: info.margin,
            strike: info.strike,
            future: info.future,
            defuturePairAddress: info.defuturePairAddress,
        };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Created At", type: Date, example: new Date() }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], PositionDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Updated At", type: Date, example: new Date() }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], PositionDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Owner", type: String, example: "0x000" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PositionDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Position Id", type: String, example: "0x000" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PositionDto.prototype, "positionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Position Type", type: String, example: "0x000" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PositionDto.prototype, "positionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Margin", type: String, example: "0x000" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PositionDto.prototype, "margin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Strike", type: String, example: "0x000" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PositionDto.prototype, "strike", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Future", type: String, example: "0x000" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PositionDto.prototype, "future", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: "Defuture Pair Address",
        type: String,
        example: "0x000",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PositionDto.prototype, "defuturePairAddress", void 0);
exports.PositionDto = PositionDto;
class PositionsDto {
    static of(info, total) {
        return {
            positions: info.map(PositionDto.of),
            total: total,
        };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Positions", type: PositionDto, example: [] }),
    __metadata("design:type", Array)
], PositionsDto.prototype, "positions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Total", type: Number, example: 0 }),
    __metadata("design:type", Number)
], PositionsDto.prototype, "total", void 0);
exports.PositionsDto = PositionsDto;
//# sourceMappingURL=positions.dto.js.map