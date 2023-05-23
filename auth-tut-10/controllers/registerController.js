const userDB = {
  users: require("../models/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const fsPromise = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: "Username and password required" });
  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409); // conflict

  try {
    const hastpwd = await bcrypt.hash(pwd, 10);
    const newUser = { username: user, password: hastpwd };
    const users = [userDB.users.newUser];

    // const user = fsPromise.writeFile(
    //   path.join(__dirname, "models", "users.json"),
    //   JSON.stringify(userDB.users)
    // );

    fsPromise.writeFile(
      path.join(__dirname, "models", "users.json"),
      JSON.stringify(userDB.users)
    );

    console.log(users);
    res.status(201).json({message: `User ${newUser.username} has registered successfully`});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleNewUser ;