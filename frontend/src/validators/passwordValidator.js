import Joi from "joi";

const passwordValidator = Joi.object({
    password: Joi.string().min(8).regex( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required().messages({
        "string.pattern.base":"must contain big and small letters and number"
    }),
    RepPassword: Joi.string().min(8).regex( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required().messages({
        "string.pattern.base":"must contain big and small letters and number"

    }),
})
export {
    passwordValidator
}