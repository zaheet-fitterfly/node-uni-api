const bcrypt = require('bcrypt');

const Helper = {
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    }
}

module.exports = Helper;