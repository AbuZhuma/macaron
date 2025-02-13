const checkUser = require("../../helpers/checkUser")
const generateRandomID = require("../../helpers/genIdH")
const User = require("../../models/user")
const jwt = require("jsonwebtoken");

const register = async(req, res) => {
      try {
            const body = req.body
            const SECRET_KEY = process.env.SECRET_KEY;
            if(!body || !body.username || !body.password || !body.city || !body.email || !body.company || !body.phone){
                  res.status(501).send("Check you`r fields!")
                  return
            }
            const isExist = await checkUser(body.username)
            if(isExist){
                  res.status(400).send("User with this name already exist!")
                  return 
            }
            const id = await generateRandomID(10)
            const options ={
                  userid: id,
                  username: body.username, 
                  password: body.password,
                  city: body.city, 
                  email:body.email,
                  company: body.company,
                  phone: body.phone,
                  createdat: new Date()
            }
            const newUser = new User(options)
            await newUser.save()
            const token = jwt.sign({ username: body.usersname,userid:id }, SECRET_KEY, { expiresIn: '20h' });
            const answ = {
              message: "User is authenticated!",
              token: token,
              userid: id,
              username: body.username
            };  

            if(newUser){
               return res.status(200).json(answ)  
            }
            res.status(400).send("Please try again later!")
      } catch (error) {
            console.log(error);
            
            res.status(501).send(error)
      }
}
module.exports = register

