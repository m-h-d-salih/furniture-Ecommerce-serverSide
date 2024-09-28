import Joi from 'joi';

const signupvalidation=Joi.object({
    name: Joi.string().required().min(3).max(25),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8)
})
export default signupvalidation;