/**
 * Title: Math library
 * Description: Utility library for math-related functions
 * Author Victor Hugo da Silva
 * Date: 10/01/22
 * 
 */

//Math object
let math = {};

// Get a random integer between two integers
math.getRandomNumber = function(max, min) {
    //Verify if max and min are numbers and if them aren't decimal numbers
    max = typeof(max) === 'number' && max % 1 == 0 ? max : 0;
    min = typeof(min) === 'number' && min % 1 == 0 ? min : 0;

    //Returns a random number between max and min numbers
    return Math.floor(Math.random()*(max-min+1)+min);
};

//Export the library
module.exports = math;
