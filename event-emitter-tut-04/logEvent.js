const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

const logEvents = async (message) => {
    const mess = message
    const dateTime = format(new Date(), 'yyyy-MM-dd\t\tHH:mm:ss');
    console.log(dateTime);
    const logItems = `${dateTime}\t${uuid()}\t ${mess}`;
    console.log(logItems);
    try {
        if(!fs.existsSync(path.join(__dirname))){
            await fs.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, "logs", "eventLog.txt"), logItems);
    } catch (error) {
        console.error(error);
    }
   
}

module.exports = logEvents