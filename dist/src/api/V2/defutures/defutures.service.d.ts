import { PrismaService } from "src/common/services/prisma.service";
import { providers } from "ethers";
import { PositionsDto } from "./dto/positions.dto";
export declare class DefuturesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    private readonly TRANSFER_SIGNATURE;
    private readonly SWAP_SIGNATURE;
    private readonly MINT_SIGNATURE;
    private readonly BURN_SIGNATURE;
    private readonly ADD_MARGIN_SIGNATURE;
    private readonly ADD_POSITION_SIGNATURE;
    private readonly CLOSE_POSITION_SIGNATURE;
    private readonly iface_erc20;
    private readonly iface_erc721;
    private readonly iface_multical;
    private readonly iface_uniswapv2defuture;
    private readonly iface_uniswapv2defuturerouter;
    private readonly iface_uniswapv2pair;
    testDecodeEventLog(): Promise<number>;
    validateTxHash(provider: providers.JsonRpcProvider, txHash: string): Promise<providers.TransactionReceipt>;
    createPosition(chainId: number, { txHash }: {
        txHash: string;
    }): Promise<void>;
    getPositions(address: string): Promise<PositionsDto>;
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
