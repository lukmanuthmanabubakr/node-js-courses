// const fsPromise = require ('fs').promises
const fsPromises = require("fs/promises");
const path = require("path");

const fsOperation = async () => {
  try {
    //readFile
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      {
        encoding: "utf8",
      }
    );
    console.log(data);
    //Write File
    await fsPromises.writeFile(
      path.join(__dirname, "new-files", "writer.txt"),
      data
    );

    await fsPromises.unlink (
      path.join(__dirname, "files", "starter.txt")
    )
        // update File
   await fsPromises.appendFile (
        path.join(__dirname, "files", "writer.txt"), '\n\nHello You have been updated')
    // console.log(newData);

    const newData =  await fsPromises.rename(
        path.join(__dirname, "new-files", "writer.txt"),
        path.join(__dirname, "files", "new-writer.txt"),
    );
    console.log(newData);
  } catch (error) {
    console.error(error);
  }
};

fsOperation();
