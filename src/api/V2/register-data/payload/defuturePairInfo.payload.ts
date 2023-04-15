import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DefuturePairInfoPayload {
  @ApiProperty({ title: "Defuture Pair Address", example: {} })
  @IsString()
  address: string;

  @ApiProperty({ title: "Token0 Address", example: {} })
  @IsString()
  token0Address: string;

  @ApiProperty({ title: "Token1 Address", example: {} })
  @IsString()
  token1Address: string;
}
