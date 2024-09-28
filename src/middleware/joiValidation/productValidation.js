import Joi from 'joi';

export const addProductValidation = Joi.object({
    title: Joi.string().required().trim(),
    price: Joi.number().required(),
    stock: Joi.number().min(1),
    category: Joi.string().required().trim(),
    // description: Joi.string(),
    // color: Joi.string(),
    // isDeleted: Joi.boolean(),
    // imageSrc: Joi.string().uri(),
    // imageAlt: Joi.string(),
  });
export const updateProductValidation = Joi.object({
    title: Joi.string().trim(),
    // description: Joi.string(),
    price: Joi.number(),
    category: Joi.string().trim(),
    // color: Joi.string()
    stock: Joi.number().min(0),
    // isDeleted: Joi.boolean(),
    // imageSrc: Joi.string().uri(),
    // imageAlt: Joi.string(),
  }).min(1);