const Joi = require("Joi")

const createValidation = Joi.object({
    name: Joi.string().required().min(2),
    surname: Joi.string().required().min(2),
    password: Joi.string().required().min(5),
    email: Joi.string().required().email(),
})

const resetPasswordValidation = Joi.object({
    email: Joi.string().required().email(),
})

module.exports={
    createValidation,
    resetPasswordValidation
}