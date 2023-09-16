
import Joi from "joi"

const signUpValidationSchema = Joi.object({
  userName: Joi.string().min(3).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,12}$/)
    .required(),
  age: Joi.number().min(10).max(30),
  phone: Joi.string(),
  gender: Joi.string(),
  isVerified: Joi.boolean(),
});

const changePassValidationSchema = Joi.object({
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,12}$/)
    .required(),
});


const logInSchem = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,12}$/)
    .required(),
});

const updateValidationSchema = Joi.object({
  userName: Joi.string().min(3).max(10),
  email: Joi.string().email(),
  age: Joi.number().min(10).max(30),
  phone: Joi.string(),
  gender: Joi.string(),
  isVerified: Joi.boolean(),
});
export {
  logInSchem,
  signUpValidationSchema,
  updateValidationSchema,
  changePassValidationSchema,
};