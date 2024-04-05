const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, "new-files", "lorem.txt"), {
    encoding : 'utf8',
})

const ws  = fs.createWriteStream(path.join(__dirname, "new-files", "stream.txt"),);


// rs.on('data', (chunk) => {
//     ws.write
// })

rs.pipe(ws)

const Data = async () => {
    try {
        await fs.unlink (
            path.join(__dirname, "new-files", "stream,txt")
          )
    } catch (error) {
        console.error(error);
    }
}

Data()