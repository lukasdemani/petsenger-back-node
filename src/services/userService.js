import pkg from '@prisma/client';
const { User } = pkg;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";


async function signUp(createUserData) {
  const existingUser = await userRepository.findByEmail(createUserData.email);

  if (existingUser) throw conflictError("Email must be unique");
  
  const hashedPassword = bcrypt.hashSync(createUserData.password, 12);
  await userRepository.insert({ ...createUserData, password: hashedPassword });
}

async function signIn(loginData) {
  const user = await getUserOrFail(loginData);

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  const nameToken = {
    name: user.firstName,
    token
  }
  return nameToken;
}

async function findById(id) {
  const user = await userRepository.findById(id);
  if (!user) throw notFoundError("User not found");

  return user;
}

async function getUserOrFail(loginData) {
  const user = await userRepository.findByEmail(loginData.email);
  if (!user) throw unauthorizedError("Invalid credentials");

  const isPasswordValid = bcrypt.compareSync(loginData.password, user.password);
  if (!isPasswordValid) throw unauthorizedError("Invalid credentials");

  return user;
}

async function truncate() {
  await userRepository.truncate();
}

export default {
  signUp,
  signIn,
  findById,
  truncate,
};
