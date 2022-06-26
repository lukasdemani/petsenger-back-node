import bcrypt from "bcrypt";
import { prisma } from "../../src/database.js";

export default async function userFactory(user) {
  await prisma.user.create({
    data: {
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    },
  });
}
