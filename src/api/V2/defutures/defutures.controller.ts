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
  ApiResponseProperty,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { DefuturesService } from "./defutures.service";
import { TxHashPayload } from "../../../common/payload/txHash.payload";

import { PositionsDto } from "./dto/positions.dto";

@Controller("v2/defutures")
export class DefuturesController {
  constructor(private readonly defuturesService: DefuturesService) {}

  @Post("test")
  @ApiOperation({ summary: "Test" })
  async test() {
    return await this.defuturesService.testDecodeEventLog();
  }

  /********************POSITION CONTROLLER *************************************/
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

  @Get("position/:address")
  @ApiOperation({ summary: "Get all positions for an address" })
  @ApiCreatedResponse({
    description: "The position has been successfully created.",
  })
  @ApiBadRequestResponse({ description: "Bad request." })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  async getPositions(@Param("address") address: string): Promise<PositionsDto> {
    return await this.defuturesService.getPositions(address);
  }
  /********************POSITION CONTROLLER *************************************/
  /**********************MARGIN CONTROLLER *************************************/
  @Post(":chainId/margin")
  @ApiOperation({ summary: "Create a new margin" })
  @ApiCreatedResponse({
    description: "The margin has been successfully created.",
  })
  @ApiBadRequestResponse({ description: "Bad request." })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  async createMargin(
    @Param("chainId", ParseIntPipe) chainId: number,
    @Body() txHashPayload: TxHashPayload
  ) {
    return await this.defuturesService.createMargin(chainId, txHashPayload);
  }
  /********************MARGIN CONTROLLER *************************************/
  /*****************ADDLIQUIDITYHEDGE CONTROLLER******************************/
  @Post(":chainId/addLiquidityHedge")
  @ApiOperation({ summary: "Create a new addLiquidityHedge" })
  @ApiCreatedResponse({
    description: "The addLiquidityHedge has been successfully created.",
  })
  @ApiBadRequestResponse({ description: "Bad request." })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  async createAddLiquidityHedge(
    @Param("chainId", ParseIntPipe) chainId: number,
    @Body() txHashPayload: TxHashPayload
  ) {
    return await this.defuturesService.createAddLiquidityHedge(
      chainId,
      txHashPayload
    );
  }
  /*****************ADDLIQUIDITYHEDGE CONTROLLER******************************/
  /*****************CLEARPOSITION CONTROLLER**********************************/
  @Post(":chainId/clearPosition")
  @ApiOperation({ summary: "Execute a new clearPosition" })
  @ApiCreatedResponse({
    description: "The clearPosition has been successfully executed.",
  })
  @ApiBadRequestResponse({ description: "Bad request." })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  @ApiInternalServerErrorResponse({ description: "Internal server error." })
  async createClearPosition(
    @Param("chainId", ParseIntPipe) chainId: number,
    @Body() txHashPayload: TxHashPayload
  ) {
    return await this.defuturesService.createClearPosition(
      chainId,
      txHashPayload
    );
  }
  /*****************CLEARPOSITION CONTROLLER**********************************/
}
