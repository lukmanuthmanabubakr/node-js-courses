const userDb = {
    users: require('../models/users.json'),
    setUser: function(data) {
        this.users = data
    }
};

const fsPromise = require('fs/promises')
const path = require('path')


const handleLogout =  async (req, res) => {
    // on client side(front end),

    const cookies = req.cookies;
    if (!cookies?.jwt)
        return res.sendStatus(204) 
        const refreshToken = cookies.jwt

    const foundUser = userDb.users.find((person) => person.refreshToken === refreshToken)

    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true});

        return res.sendStatus(204) //successful no content to send back

    }
    const otherUsers = userDb.users.filter(person => person.refreshToken != foundUser.refreshToken)
    const currentUser = {...foundUser, refreshToken: ''}
    userDb.setUser([...otherUsers, currentUser])
    await fsPromise.writeFile(path.join(__dirname, '..', 'models', 'users.json'), JSON.stringify('userDb.users'))

    res.clearCookie('jwt', {httpOnly: true})
    res.sendStatus(204)
}

module.exports = handleLogout
