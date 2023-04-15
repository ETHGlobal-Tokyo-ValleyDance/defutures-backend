import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";
import { ethers, providers } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { PositionsDto, PositionDto } from "./dto/positions.dto";
import { BigNumber } from "ethers";

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

  async testDecodeEventLog() {
    const iface = new ethers.utils.Interface([
      "event Transfer(address,address,uint256)",
    ]);
    const data =
      "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000";
    const topics = [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      ,
      "0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72",
      ,
      "0x000000000000000000000000ab7c8803962c0f2f5bbbe3fa8bf41cd82aa1923c",
      ,
    ];

    console.log(iface.parseLog({ data, topics }).args);
    console.log(BigNumber.from(BigNumber.from(12)));
    return 1;
  }

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

  async createPosition(chainId: number, { txHash }: { txHash: string }) {
    const providerUrl = await this.prismaService.chain.findUnique({
      where: { chainId },
      select: { rpcUrl: true },
    });
    const provider = new ethers.providers.JsonRpcProvider(providerUrl.rpcUrl);
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
            positionId: BigNumber.from(decoded_log.positionId).toString(),
            positionType: BigNumber.from(decoded_log.positionType).toString(),
            margin: BigNumber.from(decoded_log.margin).toString(),
            strike: BigNumber.from(decoded_log.strike).toString(),
            future: BigNumber.from(decoded_log.future).toString(),
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

  async getPositions(chainId: number, address: string): Promise<PositionsDto> {
    const positions: PositionDto[] = await this.prismaService.position.findMany(
      {
        where: {
          owner: address,
          defuturePair: {
            chainId: chainId,
          },
        },
      }
    );
    if (positions.length === 0)
      throw new NotFoundException("Address not found");
    return PositionsDto.of(positions, positions.length);
  }

  async createMargin(chainId: number, { txHash }: { txHash: string }) {}

  async createAddLiquidityHedge(
    chainId: number,
    { txHash }: { txHash: string }
  ) {}

  async createClearPosition(chainId: number, { txHash }: { txHash: string }) {}
}
