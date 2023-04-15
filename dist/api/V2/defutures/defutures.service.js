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
exports.DefuturesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/services/prisma.service");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const ethers_2 = require("ethers");
let DefuturesService = class DefuturesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
        this.TRANSFER_SIGNATURE = (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)("Transfer(address,address,uint256)"));
        this.SWAP_SIGNATURE = (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)("Swap(address,uint256,uint256,uint256,uint256,address)"));
        this.MINT_SIGNATURE = (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)("Mint(address,uint256,uint256)"));
        this.BURN_SIGNATURE = (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)("Burn(address,uint256,uint256,address)"));
        this.ADD_MARGIN_SIGNATURE = (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)("AddMargin(address,uint256,uint112,uint112)"));
        this.ADD_POSITION_SIGNATURE = (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)("AddPosition(address,uint256,uint8,uint112,uint112,uint112)"));
    }
    async testDecodeEventLog() {
        const iface = new ethers_1.ethers.utils.Interface([
            "event Transfer(address,address,uint256)",
        ]);
        const data = "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000";
        const topics = [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            ,
            "0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72",
            ,
            "0x000000000000000000000000ab7c8803962c0f2f5bbbe3fa8bf41cd82aa1923c",
            ,
        ];
        console.log(iface.parseLog({ data, topics }).args);
        console.log(ethers_2.BigNumber.from(ethers_2.BigNumber.from(12)));
        return 1;
    }
    async validateTxHash(provider, txHash) {
        const receipt = await provider.getTransactionReceipt(txHash);
        if (!receipt)
            throw new common_1.BadRequestException(`Transaction with hash ${txHash} does not exist.`);
        return receipt;
    }
    async createPosition(chainId, { txHash }) {
        const providerUrl = await this.prismaService.chain.findUnique({
            where: { chainId },
            select: { rpcUrl: true },
        });
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerUrl.rpcUrl);
        const receipt = await this.validateTxHash(provider, txHash);
        const timestamp = await provider
            .getBlock(receipt.blockNumber)
            .then((block) => {
            return new Date(block.timestamp * 1000);
        });
        receipt.logs.map((log) => {
            if (log.topics[0] === this.ADD_POSITION_SIGNATURE) {
                const data = log.data;
                const topics = log.topics;
                const decoded_log = this.iface_uniswapv2defuture.parseLog({
                    data,
                    topics,
                }).args;
                console.log(decoded_log);
                this.prismaService.position.create({
                    data: {
                        createdAt: timestamp,
                        updatedAt: timestamp,
                        owner: decoded_log.owner,
                        positionId: ethers_2.BigNumber.from(decoded_log.positionId).toString(),
                        positionType: ethers_2.BigNumber.from(decoded_log.positionType).toString(),
                        margin: ethers_2.BigNumber.from(decoded_log.margin).toString(),
                        strike: ethers_2.BigNumber.from(decoded_log.strike).toString(),
                        future: ethers_2.BigNumber.from(decoded_log.future).toString(),
                        defuturePair: {
                            connect: {
                                address: log.address,
                            },
                        },
                    },
                });
            }
        });
    }
    async createMargin(chainId, { txHash }) { }
    async createAddLiquidityHedge(chainId, { txHash }) { }
    async createClearPosition(chainId, { txHash }) { }
};
DefuturesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DefuturesService);
exports.DefuturesService = DefuturesService;
//# sourceMappingURL=defutures.service.js.map