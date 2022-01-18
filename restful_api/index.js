/**
 * Title: Http Server
 * @version 1.0.0 initial version
 * @author Victor Hugo da Silva
 * @description Building a Http Server with NodeJS by Pirple.com Course
 * @see https://pirple.com/courses/
 * Date: 11/01/2022 at 15:33pm - Tuesday (Brazil)
 *
 **/


// Dependencies
const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all requests with a string
const server = http.createServer((req, res)=> {
    
    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the method
    const method = req.method.toLowerCase();

    // Get the header as an object
    const headers = req.headers;

    // Get the payload, if any
    const decoder = new stringDecoder("utf-8");
    let buffer = '';

    req.on('data', function(data){
        buffer += decoder.write(data);
    });

    req.on('end', function(){
        buffer += decoder.end();

        // Choose the handler this request should to go
        // if one is not found, use the notFound handler

        let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ?
        router[trimmedPath] : handlers.notFound;


        // Construct the data object, to send to the handler
        let data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };


        chosenHandler(data, function(statusCode, payload) {

            // Use the status code called back by the handler, or default to 200
            statusCode = typeof(statusCode) == 'number' ?
            statusCode :  200;
            
            // use the payload called back by the handler, or default to an empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            let payloadString = JSON.stringify(payload);

            // Return the response
            res.write(statusCode);
            res.end(payloadString);

            // Log the request path
            console.log("Returning this response: ", statusCode, payloadString);
        })
        
    });

})

// Start the server, and have it listen on port 3000
server.listen(3000, ()=>console.log("The server are running on port 3000 now"));


// Define the handlers
const handlers = {};

// Sample Handler
handlers.sample = function(data, callback){
    // Callback a HTTP Status code, and payload object
    callback(406, {'name': 'sample handler'});
};

handlers.notFound = function(data, callback){
    callback(404);
};

// Define a request router
let router = {
    'sample' : handlers.sample
};

