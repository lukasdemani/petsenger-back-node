import { prisma } from '@/config';
import userService, { duplicatedEmailError } from '@/services/users-service';
import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { prisma } from "../../src/database.js";
import userBodyFactory from "../factories/userBodyFactory.js";
import { signUp, signIn } from "../../src/services/userService.js"


describe('signUp', () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it('should throw duplicatedUserError if there is a user with given email', async () => {
    const existingUser = userBodyFactory;

    try {
      await signUp({
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        password: faker.internet.password(6),
      });
      fail('should throw duplicatedUserError');
    } catch (error) {
      expect(error).toEqual(duplicatedEmailError());
    }
  });

  it('should create user when given email is unique', async () => {
    user = userBodyFactory;
    const user = await signUp(user);

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    expect(user).toEqual(
      expect.objectContaining({
        id: dbUser.id,
        email: dbUser.email,
      }),
    );
  });

  it('should hash user password', async () => {
    const rawPassword = faker.internet.password(6);
    user = userBodyFactory;
    const user = await userService.createUser(user);

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    expect(dbUser.password).not.toBe(rawPassword);
    expect(await bcrypt.compare(rawPassword, dbUser.password)).toBe(true);
  });
});

async function disconnect() {
  await prisma.$disconnect();
}

async function truncateUsers() {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
}