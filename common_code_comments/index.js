/**
 * The main purpose of writing code is so that a computer can interpret it 
 * as commands. However, it's also important that the code we write is also 
 * easily interpretable by fellow developers.
 * 
 * Have you ever gone back to a project and had difficulty understanding the
 * internal logic? Well that's probably because said project hasn't been 
 * commented properly.
 * 
 * Comments are notes written in the code that are ignored by the JavaScript
 *  engine, which means they don't affect the output in any way. Their sole 
 * purpose describing how and why code works to other developers, and yourself. 
 * 
 * Here, we will look at how to comment JavaScript code, as which types of 
 * comments exist, and some best practices.
 * 
 **/

//SINGLE LINE-COMMENTS

/**Single-line comments are generally used to comment a part of the line or full 
 * line of code. Single-line comments in JavaScript start with //. The interpreter
 * will ignore everything to the right of this control sequence until the end of 
 * the line. 
 *
 * Example:
 **/

// Print "Hello World" in the console
console.log('Hello World')

/**
 * Here, we are using a single-line comment to describe what the next line 
 * of code is doing. If a single-line comment appears at the end of a line 
 * of code, it's called an inline comment. 
 * 
 * These are generally used to add quick annotations:
 * 
 */

let c = a + b //assign sum of a, b to c

/**
 * If we'd like to add a note that is spread across multiple lines,
 * we can opt for multi-line comments or block-level comments.
 * Multi-line comments start with /* and end with '*/


/**
 * Oftentimes, these comments can include information about the proceeding code
 * such as the parameters of a functioj or even the author of the code:
 *
 * 
 * Function that greets a user
 * @author Victor
 * @param  {String} name    Name of the user
 * @return {String}         Greeting message
 *   
 */
function greetUser(name) {
    return `Greetings, ${name}!`
}

/**
 * These comments are referred to as DocStrings, as they're essentially strings 
 * (comments) that constitute the documentation of your code. 
 * 
 * These types of comments are really useful for other developers in your team, 
 * as you can clarify what the expected input is, what the output is, as well 
 * as who to contact if need be. 
 * 
 * An added benefit is that you can generate documentation based on these 
 * DocStrings.
 * 
 */


//USING COMMENTS FOR DEBUGGING

/**
 * Besides making notes, comments can also be used to quickly prevent code 
 * execution for debugging purposes. This is possible because JavaScript 
 * Engines do not interpret commented code. This is called as commenting 
 * out code. 
 * 
 * If there's an erroneous line, that's causing problems, we can simply 
 * "comment it out" to disable it, without deleting the line. This can be 
 * paired with actual debuggers to help you asses what's going on.
 * 
 */

/**
 * First of all, commenting is not an excuse to write unreadable code, and 
 * then just patch it up with five paragraphs of comments explaining it. 
 * We first have to focus on writing clean, self-explanatory code, which can 
 * later be improved with constructive comments. 
 * 
 * Use comments to explain why you did something, not how you did it. If you 
 * find yourself explaining how you did something, then it's time to take a
 * step back and refactor your code into something self-explanatory.
 * 
 */

//There are useful tools, such as JSDOC 3 that can generate documentation, 
//based just on the comments within your code, which are formatted as 
//DocStrings outlined above.

