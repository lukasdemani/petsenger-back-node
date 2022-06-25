import pkg from '@prisma/client';
const { VetAppoitment } = pkg;
import appointmentRepository from "../repositories/userRepository.js";
import findById from "../repositories/userRepository.js";

async function setAppoitment(appointmentData){
  const user = findById(appointmentData.id);

  await userRepository.insert({ ...appointmentData });
}



export default {
  setAppoitment
};
