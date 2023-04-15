import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";
import { constants } from "ethers";

export class PairInfoPayload {
  @ApiProperty({ title: "Token Name", example: constants.HashZero })
  @IsString()
  address: string;
  @ApiProperty({ title: "Token0 Address", example: constants.HashZero })
  @IsString()
  token0Address: string;
  @ApiProperty({ title: "Token1 Address", example: constants.HashZero })
  @IsString()
  token1Address: string;
}
