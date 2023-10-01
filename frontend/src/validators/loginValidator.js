import Joi from "joi";

const loginValidator = Joi.object({
    email: Joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required().messages({
        "string.pattern.base": "must contain @ and gmail.com"
    }),
    password: Joi.string().required().messages({}),
})
export {
    loginValidator
}