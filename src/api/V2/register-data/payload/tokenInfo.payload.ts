import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";
import { constants } from "ethers";

export class TokenInfoPayload {
  @ApiProperty({ title: "address", example: constants.HashZero })
  @IsString()
  address: string;
  @ApiProperty({ title: "name", example: constants.HashZero })
  @IsString()
  name: string;
  @ApiProperty({ title: "symbol", example: constants.HashZero })
  @IsString()
  symbol: string;
  @ApiProperty({ title: "decimals", example: 18 })
  @IsInt()
  decimals: number;
}
