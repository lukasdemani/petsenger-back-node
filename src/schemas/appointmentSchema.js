import Joi from "joi";

export const appointmentSchema = Joi.object({
  dateTime: Joi.string().required(),
  userId: Joi.string().required,
});
