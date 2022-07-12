import Joi from "joi";
import { joiPassword } from "joi-password";

const checkUser = (user) => {
  const Schema = Joi.object({
    username: Joi.string().email().required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
    first_name: Joi.string().min(1).max(10),
    last_name: Joi.string(),
    email: Joi.string().email(),
    gender: Joi.valid("Male", "Female", "Non-binary"),
    address: Joi.string().min(10).max(100),
    university: Joi.string().min(10).max(100),
    isActive: Joi.boolean(),
    createdAt: Joi.date(),
  });
  return Schema.validate(user);
};
module.exports = checkUser;
