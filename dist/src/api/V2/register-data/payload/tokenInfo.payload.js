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
exports.TokenInfoPayload = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const ethers_1 = require("ethers");
class TokenInfoPayload {
}
__decorate([
    (0, swagger_1.ApiProperty)({ title: "address", example: ethers_1.constants.HashZero }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TokenInfoPayload.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "name", example: ethers_1.constants.HashZero }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TokenInfoPayload.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "symbol", example: ethers_1.constants.HashZero }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TokenInfoPayload.prototype, "symbol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "decimals", example: 18 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TokenInfoPayload.prototype, "decimals", void 0);
exports.TokenInfoPayload = TokenInfoPayload;
//# sourceMappingURL=tokenInfo.payload.js.map