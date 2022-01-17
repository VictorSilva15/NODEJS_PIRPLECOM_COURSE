/**
 * Title: Http Server
 * @version 1.0.0 initial version
 * @author Victor Hugo da Silva
 * @description Building a Http Server with NodeJS by Pirple.com Course
 * @see https://pirple.com/courses/
 * date: 11/01/2022 at 15:33pm - Tuesday (Brazil)
 *
 **/


// Dependencies
const http = require('http')
const url = require('url')
const stringDecoder = require('string_decoder').StringDecoder

// The server should respond to all requests with a string
const server = http.createServer((req, res)=> {
    
    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true)

    // Get the path
    const path = parsedUrl.pathname
    const trimmedPath = path.replace(/^\/+|\/$/g, '')

    // Get the query string as an object
    const queryStringObject = parsedUrl.query

    // Get the method
    const method = req.method.toLowerCase()

    // Get the header as an object
    const headers = req.headers 

    // Get the payload, if any
    const decoder = new stringDecoder("utf-8")
    let buffer = ''

    req.on('data', function(data){
        buffer += decoder.write(data)
    })
    req.on('end', function(){
        buffer += decoder.end()

         // send a response
        res.end("Hello World\n")

        // log the path
        /* console.log("Request received on path: "+trimmedPath+
        "\nwith method: "+method+
        "\nand query string parameters: ",queryStringObject) */
        console.log("Request received with this payload: ", buffer)
        
    })

   
})

// Start the server, and have it listen on port 3000
server.listen(3000, ()=>console.log("The server are running on port 3000 now"))


