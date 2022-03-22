const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.number(),
});

module.exports = { schema };
