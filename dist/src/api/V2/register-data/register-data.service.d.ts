import { PrismaService } from "src/common/services/prisma.service";
import { ChainInfoPayload } from "./payload/chainInfo.payload";
import { TokenInfoPayload } from "./payload/tokenInfo.payload";
import { PairInfoPayload } from "./payload/pairInfo.payload";
export declare class RegisterDataService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    registerChainService(chainId: number, { name, symbol, rpcUrl, blockTime, factoryAddress, routerAddress, WETHAddress, }: ChainInfoPayload): Promise<import(".prisma/client").Chain>;
    registerTokenService(chainId: number, { name, symbol, address, decimals }: TokenInfoPayload): Promise<import(".prisma/client").Token>;
    registerPairService(chainId: number, { address, token0Address, token1Address }: PairInfoPayload): Promise<import(".prisma/client").Pair>;
    registerDefuturePairService(chainId: number, { address, token0Address, token1Address }: PairInfoPayload): Promise<import(".prisma/client").DefuturePair>;
}
