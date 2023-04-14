import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";
import { ethers, providers } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { PositionsDto } from "./dto/positions.dto";

@Injectable()
export class DefuturesService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly TRANSFER_SIGNATURE = keccak256(
    toUtf8Bytes("Transfer(address,address,uint256)")
  );
  private readonly SWAP_SIGNATURE = keccak256(
    toUtf8Bytes("Swap(address,uint256,uint256,uint256,uint256,address)")
  );
  private readonly MINT_SIGNATURE = keccak256(
    toUtf8Bytes("Mint(address,uint256,uint256)")
  );
  private readonly BURN_SIGNATURE = keccak256(
    toUtf8Bytes("Burn(address,uint256,uint256,address)")
  );
  private readonly ADD_MARGIN_SIGNATURE = keccak256(
    toUtf8Bytes("AddMargin(address,uint256,uint112,uint112)")
  );
  private readonly ADD_POSITION_SIGNATURE = keccak256(
    toUtf8Bytes("AddPosition(address,uint256,uint8,uint112,uint112,uint112)")
  );

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

  async getPositions(chainId: number, address: string): Promise<PositionsDto> {}

  async createMargin(chainId: number, { txHash }: { txHash: string }) {}

  async createAddLiquidityHedge(
    chainId: number,
    { txHash }: { txHash: string }
  ) {}

  async createClearPosition(chainId: number, { txHash }: { txHash: string }) {}
}
