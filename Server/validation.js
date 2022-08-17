const Joi = require("joi");

const registerValidation = (data) => {
  const JoiSchema = Joi.object({
    firstname: Joi.string().min(5).max(25).required(),
    lastname: Joi.string().min(5).max(25).required(),
    email: Joi.string().min(5).max(25).required().email(),
    password: Joi.string().min(5).max(25).required(),
  });

  return JoiSchema.validate(data);
};
const loginValidation = (data) => {
  const JoiSchema = Joi.object({
    email: Joi.string().min(5).max(25).required().email(),
    password: Joi.string().min(5).max(25).required(),
  });

  return JoiSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
