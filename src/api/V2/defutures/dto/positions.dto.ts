import { IsDate, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PositionDto {
  @ApiProperty({ title: "Created At", type: Date, example: new Date() })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ title: "Updated At", type: Date, example: new Date() })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({ title: "Owner", type: String, example: "0x000" })
  @IsString()
  owner: string;

  @ApiProperty({ title: "Position Id", type: String, example: "0x000" })
  @IsString()
  positionId: string;

  @ApiProperty({ title: "Position Type", type: String, example: "0x000" })
  @IsString()
  positionType: string;

  @ApiProperty({ title: "Margin", type: String, example: "0x000" })
  @IsString()
  margin: string;

  @ApiProperty({ title: "Strike", type: String, example: "0x000" })
  @IsString()
  strike: string;

  @ApiProperty({ title: "Future", type: String, example: "0x000" })
  @IsString()
  future: string;

  @ApiProperty({
    title: "Defuture Pair Address",
    type: String,
    example: "0x000",
  })
  @IsString()
  defuturePairAddress: string;

  static of(info: PositionDto): PositionDto {
    return {
      createdAt: info.createdAt,
      updatedAt: info.updatedAt,
      owner: info.owner,
      positionId: info.positionId,
      positionType: info.positionType,
      margin: info.margin,
      strike: info.strike,
      future: info.future,
      defuturePairAddress: info.defuturePairAddress,
    };
  }
}

export class PositionsDto {
  @ApiProperty({ title: "Positions", type: PositionDto, example: [] })
  positions: PositionDto[];

  @ApiProperty({ title: "Total", type: Number, example: 0 })
  total: number;

  static of(info: PositionDto[], total: number): PositionsDto {
    return {
      positions: info.map(PositionDto.of),
      total: total,
    };
  }
}
