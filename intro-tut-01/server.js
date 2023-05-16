// // BASIC INTRODUCTION TO NODE   

// // METHOD 1

// const os = require('os');
// const path = require('path');



// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__dirname))
// console.log(path.basename(__dirname))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))

// // METHOD 2

// console.log(path.parse(__filename))

const math = require('./math')
const uber = require('./uber')
const add = math.add(50, 30)
console.log(add)

const minus = math.minus(10, 5)
console.log(minus)

const divide  = math.divide(30, 2)
console.log(divide)

const multiply = math.multiply(2, 2)
console.log(multiply)


uber.uberReady();
const fuelStatus = uber.fuelLimit("Hey, stop there",  'oga fuel don finish')

console.log(fuelStatus); 



