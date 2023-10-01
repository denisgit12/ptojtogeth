import Joi from "joi";

const managerValidator = Joi.object({
    email: Joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required().messages({
        "string.pattern.base": "must contain @ and gmail.com"
    }),
    name: Joi.string().min(2).max(17).required().messages({
        "string.min": "min 2 letters",
        "string.max": "max 17 letters",
    }),
    surname: Joi.string().min(2).max(17).required().messages({
        "string.min": "min 2 letters",
        "string.max": "max 17 letters",
    })
})
export {
    managerValidator
}