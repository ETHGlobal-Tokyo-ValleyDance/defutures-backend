"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function main() {
    const prisma = new client_1.PrismaClient();
    const result = await prisma.user.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: "Alice",
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        contains: "alice",
                        mode: "insensitive",
                    },
                },
            ],
        },
    });
}
//# sourceMappingURL=addConfig.js.map