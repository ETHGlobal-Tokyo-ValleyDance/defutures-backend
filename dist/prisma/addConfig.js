"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const data = require("./data.json");
async function main() {
    const object = {
        chainId: 1,
        name: "Scroll",
        symbol: "SCR",
        rpcUrl: "https://alpha-rpc.scroll.io/l2",
        blockTime: 3,
        decimals: 18,
        t1: "0x580A9E9c750841628cb9ba2e217512A9703D8662",
        t2: "0x990D49265319fa3BC37cA3047B875c3a8d83981B",
        V2Factory: "0x9062fB4858DDcE7fD551116881F09e9c219986a8",
        V2Router: "0xFF99377f0974853a122f85116bb6a63ee42ed60B",
        WETH: "0x276B589C5AdEFf1024D52342772025A9DCa75588",
        pair12: "0xAD0d1336814F36C5E87BC14eF1Ba8058e1f3a43B",
        defutureFactory: "0xA0217e8B6995650e9C82E4Ac3DC88c49c753b02F",
        defutureRouter: "0x48C795467E0a894806F8aaF7dc93061180DA2E20",
        defuture12: "0xAD0d1336814F36C5E87BC14eF1Ba8058e1f3a43B",
    };
    const prisma = new client_1.PrismaClient();
    for (const d in data) {
        object.chainId = +d;
        object.t1 = data[d].t1;
        object.t2 = data[d].t2;
        object.V2Factory = data[d].V2Factory;
        object.V2Router = data[d].V2Router;
        object.WETH = data[d].WETH;
        object.pair12 = data[d].pair12;
        object.defutureFactory = data[d].defutureFactory;
        object.defutureRouter = data[d].defutureRouter;
        object.defuture12 = data[d].defuture12;
    }
    const result = await prisma.chain.create({
        data: {
            chainId: object.chainId,
            name: object.name,
            symbol: object.symbol,
            rpcUrl: object.rpcUrl,
            blockTime: object.blockTime,
            factoryAddress: object.V2Factory,
            routerAddress: object.V2Router,
            WETHAddress: object.WETH,
        },
    });
    const result1 = await prisma.token.create({
        data: {
            address: object.t1,
            name: "t1",
            symbol: "T1",
            decimals: 18,
            chain: {
                connect: {
                    chainId: object.chainId,
                },
            },
        },
    });
    const result2 = await prisma.token.create({
        data: {
            address: object.t2,
            name: "t2",
            symbol: "T2",
            decimals: 18,
            chain: {
                connect: {
                    chainId: object.chainId,
                },
            },
        },
    });
    const result_pair = await prisma.pair.create({
        data: {
            address: object.pair12,
            token0: {
                connect: {
                    chainId_address: {
                        chainId: object.chainId,
                        address: object.t1,
                    },
                },
            },
            token1: {
                connect: {
                    chainId_address: {
                        chainId: object.chainId,
                        address: object.t2,
                    },
                },
            },
            chain: {
                connect: {
                    chainId: object.chainId,
                },
            },
        },
    });
    const result_defuture = await prisma.defuturePair.create({
        data: {
            address: object.defuture12,
            token0: {
                connect: {
                    chainId_address: {
                        chainId: object.chainId,
                        address: object.t1,
                    },
                },
            },
            token1: {
                connect: {
                    chainId_address: {
                        chainId: object.chainId,
                        address: object.t2,
                    },
                },
            },
            chain: {
                connect: {
                    chainId: object.chainId,
                },
            },
        },
    });
}
main();
//# sourceMappingURL=addConfig.js.map