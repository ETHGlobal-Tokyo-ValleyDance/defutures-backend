import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { PrismaService } from "./common/services/prisma.service";
import { DefuturesModule } from "./api/V2/defutures/defutures.module";
import { RegisterDataModule } from "./api/V2/register-data/register-data.module";

@Module({
  imports: [CacheModule.register(), DefuturesModule, RegisterDataModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
