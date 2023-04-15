import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";
import { constants } from "ethers";

export class TokenInfoPayload {
  @ApiProperty({ title: "Transaction Hash", example: constants.HashZero })
  @IsString()
  address: string;
  @IsString()
  name: string;
  @IsString()
  symbol: string;
  @IsInt()
  decimals: number;
}
