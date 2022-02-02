//Import User Model
const res = require('express/lib/response');
const User = require('../models/user');

//Controller Actions
//signup
module.exports.signUp = async function(request, response){
    let form_data = {
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
    }
    User.signUp(form_data).then(function(results){
        return response.status(200).json({
            success:true,
            error:null,
            results
        });
    }).catch(function(error){
        return response.status(400).json({
            success:false,
            error,
            results:null
        });
    });
}