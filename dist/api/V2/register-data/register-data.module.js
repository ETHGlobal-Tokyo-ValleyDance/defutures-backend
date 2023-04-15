"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDataModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/services/prisma.service");
const register_data_controller_1 = require("./register-data.controller");
const register_data_service_1 = require("./register-data.service");
let RegisterDataModule = class RegisterDataModule {
};
RegisterDataModule = __decorate([
    (0, common_1.Module)({
        controllers: [register_data_controller_1.RegisterDataController],
        providers: [prisma_service_1.PrismaService, register_data_service_1.RegisterDataService],
    })
], RegisterDataModule);
exports.RegisterDataModule = RegisterDataModule;
//# sourceMappingURL=register-data.module.js.map