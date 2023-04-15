import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";
import { ethers, providers } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { PositionsDto, PositionDto } from "./dto/positions.dto";
import { BigNumber, constants } from "ethers";
import { LiquidityEvent, Prisma, PrismaClient } from "@prisma/client";

import * as ERC20_ABI from "../../../abi/ERC20.json";
import * as ERC721_ABI from "../../../abi/ERC721.json";
import * as Multical_ABI from "../../../abi/Multicall2.json";
import * as UniswapV2Defuture_ABI from "../../../abi/UniswapV2Defuture.json";
import * as UniswapV2DefutureRouter_ABI from "../../../abi/UniswapV2DefutureRouter.json";
import * as UniswapV2Pair_ABI from "../../../abi/UniswapV2Pair.json";

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
    toUtf8Bytes(
      "AddPosition(address,uint256,uint8,uint112,uint112,uint112,uint112)"
    )
  );
  private readonly CLOSE_POSITION_SIGNATURE = keccak256(
    toUtf8Bytes("ClosePosition(address,uint256,uint8,uint112,uint112,uint112")
  );

  private readonly iface_erc20 = new ethers.utils.Interface(ERC20_ABI);
  private readonly iface_erc721 = new ethers.utils.Interface(ERC721_ABI);
  private readonly iface_multical = new ethers.utils.Interface(Multical_ABI);
  private readonly iface_uniswapv2defuture = new ethers.utils.Interface(
    UniswapV2Defuture_ABI
  );
  private readonly iface_uniswapv2defuturerouter = new ethers.utils.Interface(
    UniswapV2DefutureRouter_ABI
  );
  private readonly iface_uniswapv2pair = new ethers.utils.Interface(
    UniswapV2Pair_ABI
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

  async createMargin(chainId: number, { txHash }: { txHash: string }) {
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
      if (log.topics[0] === this.ADD_MARGIN_SIGNATURE) {
        const data = log.data;
        const topics = log.topics;
        const decoded_log = this.iface_uniswapv2defuture.parseLog({
          data,
          topics,
        }).args;
        console.log(decoded_log);
        this.prismaService.addMargin.create({
          data: {
            createdAt: timestamp,
            txHash: txHash,
            blockNumber: receipt.blockNumber,
            from: BigNumber.from(decoded_log.from).toString(),
            amount: BigNumber.from(decoded_log.amount).toString(),
            currentMargin: BigNumber.from(decoded_log.currentMargin).toString(),
            position: {
              connect: {
                positionId_defuturePairAddress: {
                  positionId: BigNumber.from(decoded_log.positionId).toString(),
                  defuturePairAddress: log.address,
                },
              },
            },
          },
        });
        this.prismaService.position.update({
          where: {
            positionId_defuturePairAddress: {
              positionId: BigNumber.from(decoded_log.positionId).toString(),
              defuturePairAddress: log.address,
            },
          },
          data: {
            margin: BigNumber.from(decoded_log.currentMargin).toString(),
          },
        });
      }
    });
  }

  async createAddLiquidityHedge(
    chainId: number,
    { txHash }: { txHash: string }
  ) {
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

    // const liquidityData = {
    //   createdAt: timestamp,
    //   txHash: txHash,
    //   sender: receipt.from,
    //   blockNumber: receipt.blockNumber,
    //   event: LiquidityEvent.MINT,
    //   receiver: "",
    //   amountLp: "",
    //   amount0: "",
    //   amount1: "",
    //   pair: {},
    // };
    // const tmpData = {};

    const positions: Prisma.PositionCreateManyInput[] = [];
    // console.log(receipt);
    receipt.logs.map(async (log) => {
      //   console.log(log.topics[0]);
      //   const data = log.data;
      //   const topics = log.topics;
      //   const decoded_log = this.iface_uniswapv2defuturerouter.parseLog({
      //     data,
      //     topics,
      //   }).args;
      //   console.log(decoded_log);
      if (log.topics[0] === this.ADD_POSITION_SIGNATURE) {
        const data = log.data;
        const topics = log.topics;
        const decoded_log = this.iface_uniswapv2defuture.parseLog({
          data,
          topics,
        }).args;
        // console.log(decoded_log);
        positions.push({
          createdAt: timestamp,
          updatedAt: timestamp,
          owner: decoded_log.owner,
          positionId: BigNumber.from(decoded_log.positionId).toString(),
          positionType: BigNumber.from(decoded_log.positionType).toString(),
          margin: BigNumber.from(decoded_log.margin).toString(),
          strike: BigNumber.from(decoded_log.strike).toString(),
          future: BigNumber.from(decoded_log.future).toString(),
          defuturePairAddress: log.address,
        });
        //   } else if (log.topics[0] === this.TRANSFER_SIGNATURE) {
        //     const decoded_log = this.iface_erc20.parseLog({
        //       data: log.data,
        //       topics: log.topics,
        //     }).args;
        //     if (decoded_log.from === constants.HashZero) {
        //       // minting of lp tokens
        //       liquidityData.receiver = decoded_log.to;
        //       liquidityData.amountLp = decoded_log.value;
        //     }
        //   } else if (log.topics[0] === this.MINT_SIGNATURE) {
        //     const decoded_log = this.iface_uniswapv2pair.parseLog({
        //       data: log.data,
        //       topics: log.topics,
        //     }).args;
        //     console.log(decoded_log.amount0);
        //     console.log(decoded_log.amount1);

        //     liquidityData.amount0 = BigNumber.from(decoded_log.amount0).toString();
        //     liquidityData.amount1 = BigNumber.from(decoded_log.amount1).toString();
        //   } else if (log.topics[0] === this.SWAP_SIGNATURE) {
        //     tmpData["pairAddress"] = log.address;
      }
    });
    if (positions.length > 0) {
      await this.prismaService.position.createMany({
        data: positions,
      });
    }
    // liquidityData.pair = {
    //   connect: {
    //     address: tmpData["pairAddress"],
    //     chainId: chainId,
    //   },
    // };
    // console.log(liquidityData);
    // await this.prismaService.liquidity.create({
    //   data: liquidityData,
    // });
  }

  async createClearPosition(chainId: number, { txHash }: { txHash: string }) {
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
    // console.log(receipt);
    const liquidityData = {
      createdAt: timestamp,
      txHash: txHash,
      sender: receipt.from,
      event: LiquidityEvent.BURN,
      blockNumber: receipt.blockNumber,
      receiver: "",
      amountLp: "",
      amount0: "",
      amount1: "",
    };
    const tmpData = {
      pairAddress: "",
    };
    receipt.logs.map(async (log) => {
      if (log.topics[0] === this.CLOSE_POSITION_SIGNATURE) {
        const data = log.data;
        const topics = log.topics;
        const decoded_log = this.iface_uniswapv2defuture.parseLog({
          data,
          topics,
        }).args;
        // console.log(decoded_log);
        // console.log(liquidityData);
        await this.prismaService.position.update({
          where: {
            positionId_defuturePairAddress: {
              positionId: BigNumber.from(decoded_log.positionId).toString(),
              defuturePairAddress: log.address,
            },
          },
          data: {
            deletedAt: timestamp,
          },
        });
      }
    });
  }
  //   } else if (log.topics[0] === this.BURN_SIGNATURE) {
  //     const data = log.data;
  //     const topics = log.topics;
  //     const decoded_log = this.iface_uniswapv2defuture.parseLog({
  //       data,
  //       topics,
  //     }).args;
  //     liquidityData.receiver = decoded_log.to;
  //     liquidityData.amount0 = decoded_log.amount0;
  //     liquidityData.amount1 = decoded_log.amount1;
  //     tmpData.pairAddress = log.address;
  // } else if(log.topics[0] === this.TRANSFER_SIGNATURE){
  //     const data = log.data;
  //     const topics = log.topics;
  //     const decoded_log = this.iface_uniswapv2defuture.parseLog({
  //       data,
  //       topics,
  //     }).args;
  //     if(decoded_log.from === receipt.from && decoded_log.to === )
  //     liquidityData.amountLp = decoded_log.value;
  // });
}
