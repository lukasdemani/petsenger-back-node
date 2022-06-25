import appointmentRepository from "../repositories/userRepository.js";
import findById from "../repositories/userRepository.js";

async function getQuote(price){
  const quote = price + 500;

  return quote
}

export default {
  getQuote
};
