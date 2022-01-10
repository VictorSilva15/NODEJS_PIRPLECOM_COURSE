/**
 * Title: Jokes Library
 * Description: Utility library for getting a list of jokes
 * Author: Victor Hugo da Silva
 * Date: 10/01/22
 * 
 */

// Dependencies
let fs = require('fs');

// Jokes Obect
let jokes = {};

// Get all the jokes and return  them to the user
jokes.allJokes = function() {

    // Read the text file containing the jokes
    let fileContents = fs.readFileSync(__dirname + '/jokes.txt', 'utf-8');

    // Turn the string into an array
    let arrayOfJokes = fileContents.split(/\r?\n/);

    // Return the array
    return arrayOfJokes;

}

module.exports = jokes;

