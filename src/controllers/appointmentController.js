import appointmentService from "../services/appointmentService.js";

async function setAppoiment(req, res) {
  const appointment = req.body;
  await appointmentService.setAppoitment(appointment);

  res.sendStatus(201);
}


export default {
  setAppoiment,
};
