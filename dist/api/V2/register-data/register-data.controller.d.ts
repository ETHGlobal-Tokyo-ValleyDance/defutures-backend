import { RegisterDataService } from "./register-data.service";
import { ChainInfoPayload } from "./payload/chainInfo.payload";
import { TokenInfoPayload } from "./payload/tokenInfo.payload";
import { PairInfoPayload } from "./payload/pairInfo.payload";
export declare class RegisterDataController {
    private readonly registerDataService;
    constructor(registerDataService: RegisterDataService);
    postChain(chainId: number, chainInfoPayload: ChainInfoPayload): Promise<import(".prisma/client").Chain>;
    postToken(chainId: number, tokenInfoPayload: TokenInfoPayload): Promise<import(".prisma/client").Token>;
    postPair(chainId: number, pairInfoPayload: PairInfoPayload): Promise<import(".prisma/client").Pair>;
}
