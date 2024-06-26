const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const {logger} = require('./middleware/logEvent')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500

app.use(logger);



// app.use((req, res, next) => {
//       console.log(`${req.metho

// Content-type application/x-www-form-urlencoded

app.use(express.urlencoded({extended: false}))

// built-in middleware for json data

app.use(express.json());

//server static files

app.use(express.static(path.join(__dirname,'./Public')));
app.use('/subdir', express.static(path.join(__dirname,'./Public')));

app.use('/subdir', require('./route/subdir'))
app.use('/subdir', require('./route/root'))
app.use('/students', require('./route/api/students'))



const whitelist = ['https://www.abudollarsite.com', 'http://127.0.0.1:3000', 'http://localhost:3500']
corsOptions = {
      origin: (origin, callback) => {
            if(whitelist.indexOf(origin) !== -1 || !origin) {
                  callback(null, true)
            }else{
                  callback(new Error("Not allowed by CORS"))
            }
      },
      optionsuccessStatus: 200
}

app.use(cors(corsOptions));



// catch all the routes to get error 404 page

app.all('*',(req, res) => {
      res.status(404);
      if(req.accepts('html')){
      res.sendFile(path.join(__dirname, 'views', '404.html'));
      }else if (req.accepts('json')){
        res.join({Error: '404 Not Found'});
      }else{
            res.type('txt').send('404 Not Found');
      }
      
      // res.status(404)

})

app.get('/', (req, res, next) => {
      console.log('attempted a request');
      next()
}, (err, res, next) => {
      console.log ('second request attempted')
      next()
}, (req, res) => {
      console.log('final request')
      res.send('hello world')
})

// const a = (req, res, next) => {
//       console.log('attempted a request');
//       next()
// }

// const b =(err, res, next) => {
//       console.log ('second request attempted')
//       next()
// }
// const c = (req, res) => {
//       console.log('final request')
//       res.send('hello world')
// }


app.use(errorHandler)

app.listen(PORT, () => console.log(`server is listening on ${PORT}`))