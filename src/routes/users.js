const express = require('express');
const register = require('../controllers/users/reg');
const login = require('../controllers/users/login');
const authenticateJWT = require('../middlewares/checkToken');
const User = require('../models/user');
const checkUsersFields = require('../middlewares/checkUsersFields');
const router = express.Router();

router.post("/reg", checkUsersFields, register)
router.post("/login", login)
router.get("/", async(req, res) => {
      let allUsers = await User.find({})
      res.status(200).json(allUsers) 
})
router.get("/isexist", authenticateJWT, async(req, res) => {
      let usr = await User.findOne({userid: req.user.userid})
      res.status(200).json({message: "user exist", user: usr})
})

module.exports = router

