import { ApiProperty } from "@nestjs/swagger";
import {} from "class-validator";

export class DefuturePairInfoPayload {
  @ApiProperty({ title: "Defuture Pair Address", example: {} })
  @IsString()
  address: string;
}
