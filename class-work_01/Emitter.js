// const logEvent = require('./logEvent');

//
// class MyEmitter extends EventEmitter {}

// cotter = new

// myEmitter.on('log', (msg) => logEvent(msg))

// setTimeout(() => {
//     myEmitter.emit('log', 'event Emitted sucessguly')
// }, 2000)


const {EventEmitter} = require('node:events');
const logEvent = require('./logEvent')

//initialize event object

const myEmitter = new EventEmitter();
myEmitter.on('log', (msg) => logEvent(msg));

// console.log(myEmitter.listeners('log'));
myEmitter.emit('log', 'emmited')

setTimeout(() => {
    myEmitter.emit("log", "emitted");
},3000)