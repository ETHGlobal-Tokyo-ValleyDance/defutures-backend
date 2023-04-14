import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/services/prisma.module";
import { DefuturesController } from "./defutures.controller";
import { DefuturesService } from "./defutures.service";

@Module({
  controllers: [DefuturesController, PrismaModule],
  providers: [DefuturesService],
})
export class DefuturesModule {}
