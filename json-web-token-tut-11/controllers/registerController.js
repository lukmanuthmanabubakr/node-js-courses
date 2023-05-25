const userDb = {
    users: require('../models/users.json'),
    setUser: function(data) {
        this.users = data
    }
};

const fsPromises = require('fs/promises')
const path = require('path')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body;

   if (!user || !pwd) return res.status(400).json({message: "username and password required"});
   const duplicate = userDb.users.find(person => person.username === user)
   if(duplicate) return res.status(409).json({message: `User ${user} already exist`}) //conflict status

   try {
    const hashPwd = await bcrypt.hash(pwd, 10)
    const newUser = {username: user, password: hashPwd}
    userDb.setUser([...userDb.users, newUser])

    fsPromises.writeFile(path.join(__dirname, '..', 'models', 'users.json'), JSON.stringify(userDb.users))
    console.log(newUser)
    res.status(201).json({message: `User ${newUser.username} has been registered successfully`})
   } catch (error) {
    res.status(500).json({message: error.message})
   }
}

module.exports = handleNewUser