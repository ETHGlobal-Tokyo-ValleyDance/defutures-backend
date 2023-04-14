import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { PrismaService } from "./common/services/prisma.service";
import { DefuturesModule } from "./api/V2/defutures/defutures.module";
import { CommonModule } from "./common/common.module";

@Module({
  imports: [CacheModule.register(), DefuturesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
