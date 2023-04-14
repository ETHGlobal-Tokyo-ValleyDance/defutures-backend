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
exports.DefuturesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const defutures_service_1 = require("./defutures.service");
const txHash_payload_1 = require("../../../common/payload/txHash.payload");
let DefuturesController = class DefuturesController {
    constructor(defuturesService) {
        this.defuturesService = defuturesService;
    }
    async test() {
        return this.defuturesService.testDecodeEventLog();
    }
    async createPosition(chainId, txHashPayload) {
        return await this.defuturesService.createPosition(chainId, txHashPayload);
    }
    async createMargin(chainId, txHashPayload) {
        return await this.defuturesService.createMargin(chainId, txHashPayload);
    }
    async createAddLiquidityHedge(chainId, txHashPayload) {
        return await this.defuturesService.createAddLiquidityHedge(chainId, txHashPayload);
    }
    async createClearPosition(chainId, txHashPayload) {
        return await this.defuturesService.createClearPosition(chainId, txHashPayload);
    }
};
__decorate([
    (0, common_1.Post)(":chainId/test"),
    (0, swagger_1.ApiOperation)({ summary: "Test" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DefuturesController.prototype, "test", null);
__decorate([
    (0, common_1.Post)(":chainId/position"),
    (0, swagger_1.ApiOperation)({ summary: "Create a new position" }),
    (0, swagger_1.ApiCreatedResponse)({
        description: "The position has been successfully created.",
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Bad request." }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: "Unauthorized." }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "Internal server error." }),
    __param(0, (0, common_1.Param)("chainId", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, txHash_payload_1.TxHashPayload]),
    __metadata("design:returntype", Promise)
], DefuturesController.prototype, "createPosition", null);
__decorate([
    (0, common_1.Post)(":chainId/margin"),
    (0, swagger_1.ApiOperation)({ summary: "Create a new margin" }),
    (0, swagger_1.ApiCreatedResponse)({
        description: "The margin has been successfully created.",
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Bad request." }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: "Unauthorized." }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "Internal server error." }),
    __param(0, (0, common_1.Param)("chainId", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, txHash_payload_1.TxHashPayload]),
    __metadata("design:returntype", Promise)
], DefuturesController.prototype, "createMargin", null);
__decorate([
    (0, common_1.Post)(":chainId/addLiquidityHedge"),
    (0, swagger_1.ApiOperation)({ summary: "Create a new addLiquidityHedge" }),
    (0, swagger_1.ApiCreatedResponse)({
        description: "The addLiquidityHedge has been successfully created.",
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Bad request." }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: "Unauthorized." }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "Internal server error." }),
    __param(0, (0, common_1.Param)("chainId", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, txHash_payload_1.TxHashPayload]),
    __metadata("design:returntype", Promise)
], DefuturesController.prototype, "createAddLiquidityHedge", null);
__decorate([
    (0, common_1.Post)(":chainId/clearPosition"),
    (0, swagger_1.ApiOperation)({ summary: "Execute a new clearPosition" }),
    (0, swagger_1.ApiCreatedResponse)({
        description: "The clearPosition has been successfully executed.",
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Bad request." }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: "Unauthorized." }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "Internal server error." }),
    __param(0, (0, common_1.Param)("chainId", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, txHash_payload_1.TxHashPayload]),
    __metadata("design:returntype", Promise)
], DefuturesController.prototype, "createClearPosition", null);
DefuturesController = __decorate([
    (0, common_1.Controller)("v2/defutures"),
    __metadata("design:paramtypes", [defutures_service_1.DefuturesService])
], DefuturesController);
exports.DefuturesController = DefuturesController;
//# sourceMappingURL=defutures.controller.js.map