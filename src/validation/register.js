// npm i joi
import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(15)
    .required()
    .trim()
    .messages({ 'any.required': `необхідно вказати ім'я` }),
  email: Joi.string()
    .email()
    .required()
    .messages({ 'any.required': `необхідно вказати email` }),
  password: Joi.string()
    .required()
    .messages({ 'any.required': `необхідно створити пароль` }),
});

export const loginUserSchema = Joi.object({
   email: Joi.string()
    .email()
    .required()
    .messages({ 'any.required': `необхідно вказати email` }),
  password: Joi.string()
    .required()
    .messages({ 'any.required': `необхідно створити пароль` }),
});
