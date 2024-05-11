
// myEmitter.on('log', (msg) => logEvent(


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