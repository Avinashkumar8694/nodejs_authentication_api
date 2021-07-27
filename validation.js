// valdation
const Joi = require('@hapi/joi');
// registr validaion
const registerValidation = (data) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    
    };
     return Joi.validate(data, schema);

};

// login validation
const loginValidation= (data) => {
    const schema = {
        //name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    
    };
     return Joi.validate(data, schema);

};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;