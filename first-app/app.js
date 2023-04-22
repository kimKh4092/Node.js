//main module

function sayHello(name) {
    console.log('Hello', name);
}

sayHello('kimia')

//global objects in js
//available globally

// console.log();
// setTimeout(); => fall a function after a time
// clearTimeout()

// setInterval() => use to repeatedly call a function after a delay
// clearInterval()

//in node instead of window we have global object
// object.console.log()

console.log(module);
//in node every file is module and vars and functions are scooped to that module

//load a module
//require is local to each module
const logger = require('./logger.js');
console.log(logger);

logger.log('message');

//jshint app.js
//checking for errors

//module wrapper function

//node usefull modules
