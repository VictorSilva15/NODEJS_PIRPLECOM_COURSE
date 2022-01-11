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
const http = require('http')
const url = require('url')

// The server should respond to all requests with a string
const server = http.createServer((req, res)=> {
    
    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true)
    
    // Get the path
    const path = parsedUrl.pathname
    const trimmedPath = path.replace(/^\/+|\/$/g, '')

    // send a response
    res.end("Hello World\n")

    // log the path
    console.log("Request received on path: "+trimmedPath)
    
})

// Start the server, and have it listen on port 3000
server.listen(3000, ()=>console.log("The server are running on port 3000 now"))


