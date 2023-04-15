import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";
import { constants } from "ethers";

export class ChainInfoPayload {
  @ApiProperty({ title: "Chain Name", example: "Gnosis" })
  @IsString()
  name: string;
  @ApiProperty({ title: "Chain Symbol", example: "GNO" })
  @IsString()
  symbol: string;
  @ApiProperty({ title: "Chain RPC URL", example: "https://rpc.gnosis.io" })
  @IsString()
  rpcUrl: string;
  @ApiProperty({ title: "Chain Block Time", example: 15 })
  @IsInt()
  blockTime: number;
  @ApiProperty({
    title: "Chain Factory Address",
    example: constants.AddressZero,
  })
  @IsString()
  factoryAddress: string;
  @ApiProperty({
    title: "Chain Router Address",
    example: constants.AddressZero,
  })
  @IsString()
  routerAddress: string;
  @ApiProperty({ title: "Chain WETH Address", example: constants.AddressZero })
  @IsString()
  WETHAddress: string;
}
