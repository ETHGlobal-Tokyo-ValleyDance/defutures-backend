import { DefuturesService } from "./defutures.service";
import { TxHashPayload } from "../../../common/payload/txHash.payload";
export declare class DefuturesController {
    private readonly defuturesService;
    constructor(defuturesService: DefuturesService);
    test(): Promise<number>;
    createPosition(chainId: number, txHashPayload: TxHashPayload): Promise<void>;
    createMargin(chainId: number, txHashPayload: TxHashPayload): Promise<void>;
    createAddLiquidityHedge(chainId: number, txHashPayload: TxHashPayload): Promise<void>;
    createClearPosition(chainId: number, txHashPayload: TxHashPayload): Promise<void>;
}
