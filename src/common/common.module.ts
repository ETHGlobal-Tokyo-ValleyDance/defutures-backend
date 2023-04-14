import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./services/prisma.service";
import { CacheService } from "./services/cache.service";
import { CacheModule } from "@nestjs/cache-manager";
import { PrismaModule } from "./services/prisma.module";

@Global()
@Module({
  imports: [PrismaModule, CacheModule.register()],
  providers: [PrismaService, CacheService],
  exports: [PrismaService, CacheService],
})
export class CommonModule {}
