const availableUber = true;
const clientMakeOrder = false;

const uberReady = () => {
    if (availableUber && clientMakeOrder) console.log('uber is ready');
    else console.log('uber is not ready to move')
}

const fuelMinLimit = 20;
const fuelMaxLimit = 250;

const fuelLimit = ( minError, maxError ) => {
    if(fuelMinLimit <= 50) return minError;
    else if (fuelMaxLimit > 250) return maxError
    else console.log('fuel limitation is cool, jaye lo')
}

module.exports = {uberReady, fuelLimit};