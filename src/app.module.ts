import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { PrismaService } from "./common/services/prisma.service";

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
