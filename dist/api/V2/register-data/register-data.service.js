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
exports.RegisterDataService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/services/prisma.service");
let RegisterDataService = class RegisterDataService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async registerChainService(chainId, { name, symbol, rpcUrl, blockTime, factoryAddress, routerAddress, WETHAddress, }) {
        return await this.prismaService.chain.create({
            data: {
                chainId,
                name,
                symbol,
                rpcUrl,
                blockTime,
                factoryAddress,
                routerAddress,
                WETHAddress,
            },
        });
    }
    async registerTokenService(chainId, { name, symbol, address, decimals }) {
        return await this.prismaService.token.create({
            data: {
                name,
                symbol,
                address,
                decimals,
                chain: {
                    connect: {
                        chainId: chainId,
                    },
                },
            },
        });
    }
    async registerPairService(chainId, { address, token0Address, token1Address }) {
        return await this.prismaService.pair.create({
            data: {
                address,
                token0: {
                    connect: {
                        chainId_address: {
                            chainId,
                            address: token0Address,
                        },
                    },
                },
                token1: {
                    connect: {
                        chainId_address: {
                            chainId: chainId,
                            address: token1Address,
                        },
                    },
                },
                chain: {
                    connect: {
                        chainId: chainId,
                    },
                },
            },
        });
    }
    async registerDefuturePairService(chainId, { address, token0Address, token1Address }) {
        return await this.prismaService.defuturePair.create({
            data: {
                address,
                chain: {
                    connect: {
                        chainId: chainId,
                    },
                },
                token0: {
                    connect: {
                        chainId_address: {
                            chainId,
                            address: token0Address,
                        },
                    },
                },
                token1: {
                    connect: {
                        chainId_address: {
                            chainId: chainId,
                            address: token1Address,
                        },
                    },
                },
            },
        });
    }
};
RegisterDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RegisterDataService);
exports.RegisterDataService = RegisterDataService;
//# sourceMappingURL=register-data.service.js.map