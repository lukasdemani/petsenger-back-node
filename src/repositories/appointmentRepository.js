import { prisma } from "../database.js";

async function insert(appointmentData) {
    return prisma.user.create({
      data: appointmentData,
    });
  }

export default {
  insert,
};