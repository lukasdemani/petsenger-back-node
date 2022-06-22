import { VetAppoitment } from "@prisma/client";
import appoitmentRepository from "../repositories/userRepository.js";
import findById from "../repositories/userRepository.js";

async function setAppoitment(appointmentData){
  const user = findById(appointmentData.id);

  await userRepository.insert({ ...appointmentData });
}



export default {
  setAppoitment
};
