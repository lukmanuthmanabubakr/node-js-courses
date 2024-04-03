// const express = require('express');
// const app =
// const PORT = process.env.PORT || 3500;

// app.get("^/$|index(.html)?",(req, res) => {
//     res.sendFile('./views/index.html', {root: __dirname});
//     res.sendFile(path.join(__dirname, "views", "index.html"));

// })

// app.get('^/$|new-page(.html)?', (req,res) => {
//   res.sendFile(path.join(__dirname, "views", "new-page.html"));
// })

// app.get('/old-page(.html)?', (req, res) => {
//   // res.redirect(path.join(__dirname, "views", "new-page.html")) // redirect temporarily by default
//   res.redirect(301, path.join(__dirname, "views", "new-page.html")) // redirect permanently
// })

// app.listen(PORT, () => {console.log(`server is listening on ${PORT}`)});

const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3500;

// app.get("^/$|index(.html)?", (req, res) => {
//   // res.sendFile(
//   //   './views/index.html',{ root: __dirname}
//   // )
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });
// app.get("/new-page(.html)?", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "new-page.html"));
// });

// app.get("^/$|old-page(.html)?", (req, res) => {
//   res.redirect(301, path.join(__dirname, "views", "new-page.html"));
// });

// //catch all routes to get error 404 page
// app.get('/*', (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
//   //or
//  // res.status(404)
// })

app.get(
  "/",
  (req, res, next) => {
    console.log("Attemted a request");

    next();
  },
  (err, res, next) => {
    console.log("Second request attempted");
    next();
  },
  (err, res) => {
    res.send("Hello world");
    console.log("Final request");
  }
);

const unAnonimousOne = (req, res, next) => {
  console.log("Attemted a request");

  next();
};
const unAnonimousTwo = (err, res, next) => {
  console.log("Second request attempted");
  next();
}
const unAnonimousThree = (err, res) => {
  res.send("Finish request");
  console.log("Final request");
}

app.get(
  "/",[unAnonimousOne, unAnonimousTwo, unAnonimousThree])


app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
