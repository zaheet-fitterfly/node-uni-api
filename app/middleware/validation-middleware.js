const validation = require('../helpers/validator');

const userValidation = (req, res, next) => {
    const validationRule = {
        "first_name": "required|string",
        "last_name": "required|string",
        "email": "required|email",
        "gender": "required|string",
        "mobile": "string",
        "name": "string"
    }
    validation(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = {
    userValidation
}