import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";
import { ethers, providers } from "ethers";

@Injectable()
export class DefuturesService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateTxHash(
    provider: providers.JsonRpcProvider,
    txHash: string
  ): Promise<providers.TransactionReceipt> {
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt)
      throw new BadRequestException(
        `Transaction with hash ${txHash} does not exist.`
      );
    return receipt;
  }

  async createPosition(chainId: number, { txHash }: { txHash: string }) {}
}
