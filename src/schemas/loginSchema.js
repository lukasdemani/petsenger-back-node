import Joi from "joi";
import { CreateUserData } from "../services/userService.js";

export const userSchema = Joi.object<CreateUserData>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});