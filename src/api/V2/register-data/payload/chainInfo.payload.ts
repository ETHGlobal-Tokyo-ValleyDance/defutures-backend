import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";
import { constants } from "ethers";

export class ChainInfoPayload {
  @ApiProperty({ title: "Token Name", example: constants.HashZero })
  @IsString()
  name: string;
  @IsString()
  symbol: string;
  @IsString()
  rpcUrl: string;
  @IsInt()
  blockTime: number;
  @IsString()
  factoryAddress: string;
  @IsString()
  routerAddress: string;
  @IsString()
  WETHAddress: string;
}
