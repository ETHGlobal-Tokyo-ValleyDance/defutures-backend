import { Module } from "@nestjs/common";
import { PrismaService } from "./services/prisma.service";
import { PrismaModule } from "./services/prisma.module";
import { CacheService } from "./services/cache.service";

@Module({
  providers: [PrismaService, CacheService],
  imports: [PrismaModule],
})
export class CommonModule {}
