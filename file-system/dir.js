const fs = require('fs')
const path = require('path')

if (!fs.existsSync (path.join(__dirname, "files", 'directory'))) {
    fs.mkdir(path.join(__dirname, "files", 'directory'), (err) => {
        if(err) throw err;
        console.log('Directocty suceesfully created');
    })
} 
else {
    console.log('Directocty already exist');
}
if(fs.existsSync(path.join(__dirname, "files", 'folder'))) {
    fs.rmdir(path.join(__dirname, "files", 'folder'), (err) => {
        if(err) throw err;
        console.log('Directocty suceesfully created');
    })
}
