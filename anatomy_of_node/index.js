/**
 * Title: Basic Node Example
 * Description: Simple file that declares a few functions and invoke them.
 * Author: Victor Hugo da Silva
 * Date: 10/01/22
 * 
*/

// Dependencies
let mathLib = require('./lib/math');
let jokesLib = require('./lib/jokes');

// App Object
let app =  {};

// Configuration
app.config = {
    'timeBetweenJokes': 1000
};

// Function that print a random joke
app.printAJoke = function(){

    // Get all the jokes
    let allJokes = jokesLib.allJokes();

    // Get the length of the jokes
    let numbersOfJokes = allJokes.length;

    // Pick a random number between 1 and the number of jokes
    let randomNumber = mathLib.getRandomNumber(1, numbersOfJokes);

    // Get the joke at that position in the array (minus one)
    let selectedJoke = allJokes[randomNumber - 1];

    // Send the joke to the console
    console.log(selectedJoke);

};

//Function that loops indefinitely, calling the printAJoke function 
app.indefiniteLoop = function(){

    // Create the interval, using config variable defined above
    setInterval(app.printAJoke, app.config.timeBetweenJokes);
};

// Invoke the loop
app.indefiniteLoop();


