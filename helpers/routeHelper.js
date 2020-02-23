const Joi = require('@hapi/joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            // Validate the values and if error return 400 status
            const result = schema.validate(req.body);
            if (result.error) {
                return res.status(400).json(result.error);
            }

            next();
        }
    },

    schemas: {
        authSchema: Joi.object().keys({
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        signInSchema: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        })
    }
}