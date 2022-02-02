//Library Imports
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Local Imports
const { pool } = require('../config/db');
const validate = require('../config/validate');

//SignUp
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

//Login
module.exports.login = function ({ username, password }) {
    return new Promise(async function (resolve, reject) {
        let ans;
        try {
            ans = await validate(username, password);
        } catch (error) {
            return reject(error);
        }
        if (ans) {
            jwt.sign(
                { username },
                process.env.SIGN_SECRET,
                { expiresIn: '24h' },
                function (error, token) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve({
                        username: username,
                        access_token: token
                    });
                }
            )
        } else {
            return reject('Password Incorrect');
        }
    });
}