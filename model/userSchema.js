const Joi = require('joi');


const userSchema = Joi.object({
    user_id : Joi.number().required(),
    username : Joi.string().required(),
    password : Joi.string().required(),
    age : Joi.number().required(),
})



module.exports = userSchema;