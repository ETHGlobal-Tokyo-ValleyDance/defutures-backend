import { Module } from "@nestjs/common";
import { PrismaModule } from "src/common/services/prisma.module";
import { PrismaService } from "src/common/services/prisma.service";
import { DefuturesController } from "./defutures.controller";
import { DefuturesService } from "./defutures.service";

@Module({
  controllers: [DefuturesController],
  providers: [DefuturesService, PrismaService],
})
export class DefuturesModule {}
