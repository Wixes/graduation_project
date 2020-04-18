const Joi = require('@hapi/joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            // Validate the values and if error return 400 status
            const result = schema.validate(req.body);
            if (result.error) {
                console.log('Validation error');
                console.log(result.error.details[0].message);
                const message = result.error.details[0].message;
                console.log('message: ', message);
                return res.render('error', {
                    message: message,
                    errorStatus: 'Ошибка валидации'
                });
            }

            next();
        }
    },

    schemas: {
        authSchema: Joi.object().keys({
            firstname: Joi.string().min(2).max(20).required(),
            lastname: Joi.string().min(2).max(20).required(),
            email: Joi.string().min(5).max(32).email({ minDomainSegments: 2 }).required(),
            password: Joi.string().min(7).max(32).required()
        }),
        signInSchema: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        })
    }
}