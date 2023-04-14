import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { constants } from "ethers";

export class TxHashPayload {
  @ApiProperty({ title: "Transaction Hash", example: constants.HashZero })
  @IsString()
  txHash: string;
}
