import { prisma } from "../database.js";

async function findById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}
async function findByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function insert(createUserData) {
  return prisma.user.create({
    data: createUserData,
  });
}

async function truncate() {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
}

export default {
  findByEmail,
  findById,
  insert,
  truncate,
};
