import { PrismaService } from "src/common/services/prisma.service";
import { providers } from "ethers";
export declare class DefuturesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    private readonly TRANSFER_SIGNATURE;
    private readonly SWAP_SIGNATURE;
    private readonly MINT_SIGNATURE;
    private readonly BURN_SIGNATURE;
    private readonly ADD_MARGIN_SIGNATURE;
    private readonly ADD_POSITION_SIGNATURE;
    testDecodeEventLog(): Promise<number>;
    validateTxHash(provider: providers.JsonRpcProvider, txHash: string): Promise<providers.TransactionReceipt>;
    createPosition(chainId: number, { txHash }: {
        txHash: string;
    }): Promise<void>;
    createMargin(chainId: number, { txHash }: {
        txHash: string;
    }): Promise<void>;
    createAddLiquidityHedge(chainId: number, { txHash }: {
        txHash: string;
    }): Promise<void>;
    createClearPosition(chainId: number, { txHash }: {
        txHash: string;
    }): Promise<void>;
}
