const userDb = {
    users: require('../models/users.json'),
    setUser: function(data) {
        this.users = data
    }
};

const jwt = require('jsonwebtoken')
require('dotenv').config()
const path = require('path')
const fsPromise = require('fs/promises')


const handleRfereshToken =  (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.status(401) 
        console.log(cookies.jwt)

    const foundUser = userDb.users.find((person) => person.refreshToken === refreshToken)

    if(!foundUser) return res.status(403).json({message: "Username does not exist"})

    // evaluate password
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403)
            const accessToken = jtw.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )
            res.json({accessToken})
        }
    )
}

module.exports = handleRfereshToken