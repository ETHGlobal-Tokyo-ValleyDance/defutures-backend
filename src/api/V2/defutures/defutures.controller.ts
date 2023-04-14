import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { DefuturesService } from "./defutures.service";
import { TxHashPayload } from "../../../common/payload/txHash.payload";

@Controller("v2/defutures")
export class DefuturesController {
  constructor(private readonly defuturesService: DefuturesService) {}

  @Post(":chainId/position")
  @ApiOperation({ summary: "Create a new position" })
  @ApiCreatedResponse({
    description: "The position has been successfully created.",
  })
  @ApiBadRequestResponse({ description: "Bad request." })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  async createPosition(
    @Param("chainId", ParseIntPipe) chainId: number,
    @Body() txHashPayload: TxHashPayload
  ) {
    return await this.defuturesService.createPosition(chainId, txHashPayload);
  }
}
