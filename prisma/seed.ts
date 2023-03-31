import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function generateShow() {
  await prisma.show.upsert({
    where: {
      id: 222,
    },
    create: {
      id: 222,
      name: 'Sao Paulo Fashion Week',
    },
    update: {},
  });
}

async function main() {
  await generateShow();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
