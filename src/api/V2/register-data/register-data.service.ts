import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";
import { ChainInfoPayload } from "./payload/chainInfo.payload";
import { TokenInfoPayload } from "./payload/tokenInfo.payload";
import { PairInfoPayload } from "./payload/pairInfo.payload";

@Injectable()
export class RegisterDataService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerChainService(
    chainId: number,
    {
      name,
      symbol,
      rpcUrl,
      blockTime,
      factoryAddress,
      routerAddress,
      WETHAddress,
    }: ChainInfoPayload
  ) {
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
  async registerTokenService(
    chainId: number,
    { name, symbol, address, decimals }: TokenInfoPayload
  ) {
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

  async registerPairService(
    chainId: number,
    { address, token0Address, token1Address }: PairInfoPayload
  ) {
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
}
