//Library Imports
const bcrypt = require('bcryptjs');

//Local Imports
const { pool } = require('../config/db');

module.exports.signUp = function ({
    username: username,
    email: email,
    password: password,
}) {
    return new Promise(async function (resolve, reject) {
        bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), function (error, salt) {
            if (error) {
                return reject(error);
            }
            bcrypt.hash(password, salt, function (error, hash) {
                if (error) {
                    return reject(error);
                }
                pool.query(`INSERT INTO users (username, email,password) VALUES(?,?,?)`, [username, email, hash], function (error, _) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve('Account Created');
                })
            });
        })
    });
}
