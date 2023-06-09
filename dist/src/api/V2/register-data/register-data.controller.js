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
exports.RegisterDataController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const register_data_service_1 = require("./register-data.service");
const common_2 = require("@nestjs/common");
const chainInfo_payload_1 = require("./payload/chainInfo.payload");
const tokenInfo_payload_1 = require("./payload/tokenInfo.payload");
const pairInfo_payload_1 = require("./payload/pairInfo.payload");
const defuturePairInfo_payload_1 = require("./payload/defuturePairInfo.payload");
let RegisterDataController = class RegisterDataController {
    constructor(registerDataService) {
        this.registerDataService = registerDataService;
    }
    async postChain(chainId, chainInfoPayload) {
        return await this.registerDataService.registerChainService(chainId, chainInfoPayload);
    }
    async postToken(chainId, tokenInfoPayload) {
        return await this.registerDataService.registerTokenService(chainId, tokenInfoPayload);
    }
    async postPair(chainId, pairInfoPayload) {
        return await this.registerDataService.registerPairService(chainId, pairInfoPayload);
    }
    async postDefuturePair(chainId, defuturePairInfoPayload) {
        return await this.registerDataService.registerDefuturePairService(chainId, defuturePairInfoPayload);
    }
};
__decorate([
    (0, common_1.Post)(":chainId/postChain"),
    (0, swagger_1.ApiOperation)({ summary: "Post a new chain" }),
    __param(0, (0, common_1.Param)("chainId", common_2.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, chainInfo_payload_1.ChainInfoPayload]),
    __metadata("design:returntype", Promise)
], RegisterDataController.prototype, "postChain", null);
__decorate([
    (0, common_1.Post)(":chainId/postToken"),
    (0, swagger_1.ApiOperation)({ summary: "Post a new token" }),
    __param(0, (0, common_1.Param)("chainId", common_2.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, tokenInfo_payload_1.TokenInfoPayload]),
    __metadata("design:returntype", Promise)
], RegisterDataController.prototype, "postToken", null);
__decorate([
    (0, common_1.Post)(":chainId/postPair"),
    (0, swagger_1.ApiOperation)({ summary: "Post a new pair" }),
    __param(0, (0, common_1.Param)("chainId", common_2.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pairInfo_payload_1.PairInfoPayload]),
    __metadata("design:returntype", Promise)
], RegisterDataController.prototype, "postPair", null);
__decorate([
    (0, common_1.Post)(":chainId/postDefuturePair"),
    (0, swagger_1.ApiOperation)({ summary: "Post a new defuture pair" }),
    __param(0, (0, common_1.Param)("chainId", common_2.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, defuturePairInfo_payload_1.DefuturePairInfoPayload]),
    __metadata("design:returntype", Promise)
], RegisterDataController.prototype, "postDefuturePair", null);
RegisterDataController = __decorate([
    (0, common_1.Controller)("register-data"),
    __metadata("design:paramtypes", [register_data_service_1.RegisterDataService])
], RegisterDataController);
exports.RegisterDataController = RegisterDataController;
//# sourceMappingURL=register-data.controller.js.map