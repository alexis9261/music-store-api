const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: Joi.any(),
  phone: Joi.any(),
  userId: userId.required()
});

const updateCustomerSchema = Joi.object({
  name: name,
  userId: userId
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
