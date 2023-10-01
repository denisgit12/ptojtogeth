// import Joi from "joi";
//
// const updateValidator = Joi.object({
//
//     name: Joi.string().min(2).max(25).messages({}),
//     surname: Joi.string().min(2).max(25).messages({}),
//     email: Joi.string().messages({}),
//     phone: Joi.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).messages({}),
//     age: Joi.number().min(15).max(100).messages({}),
//     course: Joi.string().messages({}),
//     course_type: Joi.string().messages({}),
//     course_format: Joi.string().messages({}),
//     status: Joi.string().messages({}),
//     sum: Joi.number().max(100000).messages({}),
//     already_paid: Joi.number().max(100000).messages({}),
//     group: Joi.string().min(5).max(25).messages({}),
//     // manager: Joi.string().min(5).max(25).messages({}),
//     // comment: Joi.string().min(2).max(100).messages({}),
//
// })
// export {
//     updateValidator
// }