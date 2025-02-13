const checkUser = require("../../helpers/checkUser");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../../helpers/hashingH");

const login = async (req, res) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  try {
    const { username, password } = req.body;

    const findedUser = await checkUser(username); 
    if (!findedUser) {
      res.status(404).send("User doesn't exist!"); 
      return;
    }

    const compared = await comparePassword(password, findedUser.password);
    if (!compared) {
      res.status(403).send("Wrong password!");
      return;
    }

    const token = jwt.sign({ username,userid:findedUser.userid }, SECRET_KEY, { expiresIn: '20h' });
    const answ = {
      message: "User is authenticated!",
      token: token,
      userid: findedUser.userid,
      username: username
    };  
    res.status(200).json(answ);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error"); 
  }
};

module.exports = login;
