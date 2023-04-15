import { Controller, Post, Body, Param } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { RegisterDataService } from "./register-data.service";
import { ParseIntPipe } from "@nestjs/common";

import { ChainInfoPayload } from "./payload/chainInfo.payload";
import { TokenInfoPayload } from "./payload/tokenInfo.payload";
import { PairInfoPayload } from "./payload/pairInfo.payload";
import { DefuturePairInfoPayload } from "./payload/defuturePairInfo.payload";

@Controller("register-data")
export class RegisterDataController {
  constructor(private readonly registerDataService: RegisterDataService) {}

  @Post(":chainId/postChain")
  @ApiOperation({ summary: "Post a new chain" })
  async postChain(
    @Param("chainId", ParseIntPipe) chainId: number,
    @Body() chainInfoPayload: ChainInfoPayload
  ) {
    return await this.registerDataService.registerChainService(
      chainId,
      chainInfoPayload
    );
  }

  @Post(":chainId/postToken")
  @ApiOperation({ summary: "Post a new token" })
  async postToken(
    @Param("chainId", ParseIntPipe) chainId: number,
    @Body() tokenInfoPayload: TokenInfoPayload
  ) {
    return await this.registerDataService.registerTokenService(
      chainId,
      tokenInfoPayload
    );
  }

  @Post(":chainId/postPair")
  @ApiOperation({ summary: "Post a new pair" })
  async postPair(
    @Param("chainId", ParseIntPipe) chainId: number,
    @Body() pairInfoPayload: PairInfoPayload
  ) {
    return await this.registerDataService.registerPairService(
      chainId,
      pairInfoPayload
    );
  }
  @Post(":chainId/postDefuturePair")
  @ApiOperation({ summary: "Post a new defuture pair" })
  async postDefuturePair(
    @Param("chainId", ParseIntPipe) chainId: number,
    @Body() defuturePairInfoPayload: DefuturePairInfoPayload
  ) {
    return await this.registerDataService.registerDefuturePairService(
      chainId,
      defuturePairInfoPayload
    );
  }
}
