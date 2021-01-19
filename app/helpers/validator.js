const Validator = require('validatorjs');
const db = require("../models");
Validator.registerAsync('exist', function(value, attribute, req, passes) {
    if (!attribute)
        throw new Error('Specify Requirements i.e fieldName: exist:table,column');
    //split table and column
    let attArr = attribute.split(",");
    console.log(attArr);
    if (attArr.length !== 2)
        throw new Error(`Invalid format for validation rule on ${attribute}`);

    //assign array index 0 and 1 to table and column respectively
    const { 0: model, 1: column } = attArr;
    //define custom error message
    let msg = (column == "username") ? `${column} has already been taken` : `${column} already in use`
        //check if incoming value already exists in the database
    db[model].findOne({
        where: {
            [column]: value
        }
    }).then(result => {
        if (result) {
            passes(false, msg);
            return;
        }
        passes();
    });
});
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};
module.exports = validator;