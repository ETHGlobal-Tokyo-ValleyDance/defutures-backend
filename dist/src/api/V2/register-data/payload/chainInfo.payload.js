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
exports.ChainInfoPayload = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const ethers_1 = require("ethers");
class ChainInfoPayload {
}
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Chain Name", example: "Gnosis" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChainInfoPayload.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Chain Symbol", example: "GNO" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChainInfoPayload.prototype, "symbol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Chain RPC URL", example: "https://rpc.gnosis.io" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChainInfoPayload.prototype, "rpcUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Chain Block Time", example: 15 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ChainInfoPayload.prototype, "blockTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: "Chain Factory Address",
        example: ethers_1.constants.AddressZero,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChainInfoPayload.prototype, "factoryAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: "Chain Router Address",
        example: ethers_1.constants.AddressZero,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChainInfoPayload.prototype, "routerAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ title: "Chain WETH Address", example: ethers_1.constants.AddressZero }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChainInfoPayload.prototype, "WETHAddress", void 0);
exports.ChainInfoPayload = ChainInfoPayload;
//# sourceMappingURL=chainInfo.payload.js.map