import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const burger = await prisma.product.upsert({
        where: {name: "DingBurger"},
        update: {},
        create: {
            name: "DingBurger",
        }
    });
    const fries = await prisma.product.upsert({
        where: {name: "DingFries"},
        update: {},
        create: {
            name: "DingFries",
        }
    });
    const dingCorpo = await prisma.enterprises.upsert({
        where: { name: 'DingCorpo' },
        update: {},
        create: {
            name: 'DingCorpo',
            stores: {
                create: [{
                    name: "Ding-Paris",
                    stocks: {
                        create: [{
                            productId: burger.id,
                            quantity: 247,
                        }, {
                            productId: fries.id,
                            quantity: 54,
                        }]
                    }
                }, {
                    name: "Ding-Poitiers",
                    stocks: {
                        create: [{
                            productId: burger.id,
                            quantity: 65,
                        }, {
                            productId: fries.id,
                            quantity: 412,
                        }]
                    }
                }],
            },
        },
    });
    const dingSubsidiary  = await prisma.enterprises.upsert({
        where: { name: 'DingSubsidiary' },
        update: {},
        create: {
            name: 'DingSubsidiary',
            stores: {
                create: [{
                    name: "Ding-Marseille",
                    stocks: {
                        create: [{
                            productId: burger.id,
                            quantity: 157,
                        }, {
                            productId: fries.id,
                            quantity: 123,
                        }]
                    }
                },{
                    name: "Ding-Nancy",
                    stocks: {
                        create: [{
                            productId: burger.id,
                            quantity: 95,
                        }, {
                            productId: fries.id,
                            quantity: 154,
                        }]
                    }
                }],
            },
        },
    });

    console.log({ burger, fries, dingCorpo, dingSubsidiary})
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })