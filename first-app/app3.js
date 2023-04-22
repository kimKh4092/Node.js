//events module
//concept of events in node : a signal that indicates that sth has happend

//classes raise different kind of events
//our job is to respond to events

const EventEmitter = require('events');
//eventemitter is a class

const emitter = new EventEmitter();
//emiiter is an object ,an instance of a class


emitter.on('messageLogged', function (arg) { //e, eventarg
    console.log('Listener called', arg);
})
// emitter.addListener() or emitter.on()
//register a listener that will be called when an event is raised


emitter.emit('messageLogged', { id: 1, url: 'http://' });
//use to raise an event

//order of raising an event and registering a listener matters
//event arguments to pass data ab event



const Logger = require('./logger.js');
const logger = new Logger();

logger.on('messageLogged', function (arg) { //e, eventarg
    console.log('Listener called', arg);
})

logger.log('message');
