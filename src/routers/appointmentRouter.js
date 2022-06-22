import { Router } from "express";
import appointmentController from "../controllers/appointmentController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { appointmentSchema } from "../schemas/appointmentSchema.js";

const appointmentRouter = Router();

appointmentRouter.post(
  "/setAppointment",
  validateSchemaMiddleware(appointmentSchema),
  appointmentController.setAppoiment
);

export default appoitmentRouter;
