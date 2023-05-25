const userDb = {
    users: require('../models/users.json'),
    setUser: function(data) {
        this.users = data
    }
};

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const path = require('path')
const fsPromise = require('fs/promises')


const handleLogin = async (req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({message: "username and password required"});
    const foundUser = userDb.users.find((person) => person.username === user)
    if(!foundUser) return res.status(401).json({message: "Username does not exist"})

    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password)
    if(match) {
        // create JWT
        const accessToken = jwt.sign(
         {username: foundUser.username}, 
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn: '30s'}   
        )

        const refreshToken = jwt.sign(
         {username: foundUser.username}, 
         process.env.REFRESH_TOKEN_SECRET,
         {expiresIn: '1d'}   
        )

        // saving refesh token with current user
        const otherUsers = userDb.users.filter(person => person.username !== foundUser.username)
        const currentUsers = {...foundUser, refreshToken} 
        userDb.setUser([...otherUsers, currentUsers])

        await fsPromise.writeFile(path.join(__dirname, '..', 'models', 'users.json'), JSON.stringify(userDb.users))
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})

        return res.status(200).json({accessToken})
    }
    else {
        return res.status(401).json({message: "password incorrect, try again"})
    }
}

module.exports = handleLogin