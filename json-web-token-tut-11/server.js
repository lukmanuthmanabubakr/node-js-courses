const express = require('express')
const app = express()
const path  = require('path');
const { logger } = require('./middleware/logEvent')
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');


const PORT = process.env.PORT || 3500

// custom middleware
app.use(logger)

// built-in middleware to handle url-encoded data :
// content-type: application/x-www-form-urlencoded

app.use(express.urlencoded({extended: false}))

// built-in middleware for json data
app.use(express.json())
const corsOption = require('./config/corsOptions');
app.use(cors(corsOption))

// server static file
app.use('/', express.static(path.join(__dirname, './public')))


app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))


 
// register route
app.use('/register', require('./routes/register'))

// auth route
app.use('/login', require('./routes/auth'))

// auth route
app.use('/refresh', require('./routes/refresh'))

app.use('/logout', require('./routes/logout'))


// verifyjwt api route
app.use(verifyJWT)

// student api route
app.use('/student', require('./routes/api/student'))



app.get('^/$|index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('^/$|new-page(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page.html', (req, res) => {
    res.redirect(301, path.join(__dirname, 'views', 'new-page.html'))
})

// catch all routes to get error 404 page
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')) {
        res.join(({Error: '404 Not Found'}))
    }else {
        res.type('txt').send('404 not found')
    }
})

// application level middleware
// app.get('/', (req, res, next) => {
//     console.log('attempting a request')
//     next();
// },
// (err, res, next) => {
//     console.log('second request made')
//     next()
// },
// (req, res) => {
// console.log('final request')
//     res.send('hello world')
// })

// const first = (req, res, next) => {
//     console.log('attempting a request')
//     next();
// }
// const second =  (err, res, next) => {
//     console.log('second request made')
//     next()
// }
// const third = (req, res) => {
// console.log('final request')
//     res.send('hello world')
// }

// const requests = [first, second, third]

// app.get('/', requests)

app.use(errorHandler) 

app.listen(PORT, () => {
    console.log(`server listening ${PORT}`)
})

