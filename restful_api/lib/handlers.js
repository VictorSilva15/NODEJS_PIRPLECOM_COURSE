/**
 * Request handlers
 * 
 */


// Dependencies
const _data = require('./data');
const helpers = require('./helpers');

// Define the handlers
const handlers = {};


// Users
handlers.users = function(data, callback){
    let acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    }else{
        //statusCode to not allowed
        callback(405)
    }
};

// Ping Handler
handlers.ping = function(data, callback){
    callback(200);
};

// NotFound Handler
handlers.notFound =function(data, callback){
    callback(404);
};


// Container for the users submethods 
handlers._users = {};

// Users - post
// Required data: firstname, lastname, phone password, tosAgreement
// Optional data: none
handlers._users.post = function(data, callback){
    // Check that all the required fields are filled out
    let firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ?
    data.payload.firstName : false;

    let lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ?
    data.payload.lastName : false;

    let phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length == 10 ?
    data.payload.phone : false;

    let password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ?
    data.payload.password : false;

    let tosAgreement = typeof(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement ? 
    true : false;


    if(firstName && lastName && phone && password && tosAgreement) {
        // Make sure that the user doesn't already exist
        _data.read('users', phone, (err, data)=>{
            if(err){
                let hashedPassword = helpers.hash(password);
                
                // Create the User Object
                if(hashedPassword){
                    const userObject = {
                        'firstName': firstName,
                        'lastName': lastName,
                        'phone': phone,
                        'hashedPassword': hashedPassword,
                        'tosAgreement': true,
                    };
    
                    // Store the user
                    _data.create('users', phone, userObject, (err)=>{
                        if (!err) {
                            callback(200);
                        }else{
                            console.log(err);
                            callback(500, {'Error' : 'Could not create the new user'});
                        }
                    });
                }else{
                    callback(500, {'Error' : 'Could not hash the user\'s password'});
                }



            }else{
                // user already exist
                callback(400, {'Error': 'A user with that phone number already exists'});
            }
        })
    }else{
        callback(400, {'Error':'Missing required fields'});
    }

};

// Users - get
// Required data: phone
// Optional data: none
/**@TODO Only let an authenticated user access their object. Don't let them  access anyone else's */

handlers._users.get = function(data, callback){
    let phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ?
    data.queryStringObject.phone.trim() : false;

    if(phone){
        _data.read('users', phone, (err, data)=>{
            if(!err && data){
                // Remove the hashed password from the user object before returning it to the requester
                delete data.hashedPassword;
                callback(200, data);
            }else{
                callback(404)
            }
        });
    }else{
        callback(400, {'Error': "Missing required field"})
    }
};

// Users - put
handlers._users.put = function(data, callback){

};

// Users - delete
handlers._users.delete = function(data, callback){

};



// Export handlers
module.exports = handlers;