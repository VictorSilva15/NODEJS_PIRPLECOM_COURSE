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
const https = require('https');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const _data = require('./lib/data');

/**
 * TESTING
 * @TODO delete this
 * 
 * @example CREATE
 * _data.create('test', 'newFile', {"name": "victor"}, (err)=>{
 *      console.log("This was the error: " + err);
 * })
 * 
 * @example READ
 * _data.read('test', 'newFile', (err, data)=>{
 *      console.log("This was the error: ", err, "\nand this was the data: ", data);
 * })
 * 
 * 
 * @example UPDATE
 * _data.update('test', 'newFile', {'name': "Yuriko"},(err)=>{
 *      console.log("This was the error: ", err);
 * })
 * 
 */

_data.delete('test', 'newFile',(err)=>{
    console.log("This was the error: ", err);
})





// Instantiate the HTTP server
const httpServer = http.createServer(unifiedServer);

// Start the HTTP server
httpServer.listen(config.httpPort, ()=>{
    console.log(`Running at ${config.httpPort} port in ${config.envName} mode`)
});


// Instantiate the HTTPS server
let httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem'),
};

const httpsServer = https.createServer(httpsServerOptions, unifiedServer);


// Start the HTTPS server
httpsServer.listen(config.httpsPort, ()=>{
    console.log(`Running at ${config.httpsPort} port in ${config.envName} mode`)
});


// All the server logic for both http and https server
function unifiedServer(req, res) {
    
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
            res.setHeader('Content-Type', "application/json");
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request path
            console.log("Returning this response: ", statusCode, payloadString);
        })
        
    });
}


// Define the handlers
const handlers = {

    // Ping Handler
    ping: function(data, callback){
        callback(200);
    },

    notFound: function(data, callback){
        callback(404);
    }

};

// Define a request router
let router = {
    'ping' : handlers.ping
};


