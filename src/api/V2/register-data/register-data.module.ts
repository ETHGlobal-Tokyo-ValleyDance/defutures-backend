import { Module } from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";
import { RegisterDataController } from "./register-data.controller";
import { RegisterDataService } from "./register-data.service";

@Module({
  controllers: [RegisterDataController],
  providers: [PrismaService, RegisterDataService],
})
export class RegisterDataModule {}
