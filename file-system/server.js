//Read fil
// process.on("uncaughtException", (err) => {
//     console.log(`"There was an error proceesing the data: )

//Read file method 2
const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);


//Writing file

fs.writeFile(
  path.join(__dirname, "files", "new.txt"),
  "Hello I am writing you",
  (err) => {
    if (err) throw err;
    console.log("write file completed successfully");

    fs.appendFile(
      path.join(__dirname, "files", "new.txt"),
      "\n\n I have been updated successfully",
      (err) => {
        if (err) throw err;
        console.log("file updated successfully");

        fs.rename(
          path.join(__dirname, "files", "new.txt"),
          path.join(__dirname, "files", "final.txt"),
          (err) => {
            if (err) throw err;
            console.log("Rename completed");
          }
        );
      }
    );
  }
);

fs.appendFile(
  path.join(__dirname, "files", "index.js"),
  'console.log("hello world")',
  (err) => {
    if (err) throw err;
    console.log("Updating 2 completed");

    fs.rename(
        path.join(__dirname, "files", "index.js"),
        path.join(__dirname, "files", "main.js"),
        (err) => {
          if (err) throw err;
          console.log("Rename completed");

          fs.link(
            path.join(__dirname, "files", "index.js"), 
            (err) => {
                if (err) throw err;
                console.log('file deleted');
            }
        )
        }
      );
  }
  
);

// fs.link(
//     path.join(__dirname, "files", "index.js"), 
//     (err) => {
//         if (err) throw err;
//         console.log('file deleted');
//     }
// )

process.on("uncaughtException", (err) => {
  console.log(`"There was an error proceesing the data:  "${err}`);
  process.exit(1);
});
