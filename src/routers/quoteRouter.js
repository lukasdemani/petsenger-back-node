import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
//import { appointmentSchema } from "../schemas/appointmentSchema.js";
import quoteController from "../controllers/quoteController.js";

const quoteRouter = Router();

quoteRouter.post(
  "/quote",
  //validateSchemaMiddleware(appointmentSchema),
  quoteController.getQuote
);

export default quoteRouter;