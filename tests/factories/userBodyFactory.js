import { faker } from "@faker-js/faker";

export default function userBodyFactory() {
  return {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
