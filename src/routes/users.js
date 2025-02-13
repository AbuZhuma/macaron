const express = require('express');
const register = require('../controllers/users/reg');
const login = require('../controllers/users/login');
const authenticateJWT = require('../middlewares/checkToken');
const router = express.Router();

router.post("/reg", register)
router.post("/login", login)
router.get("/isexist", authenticateJWT, (req, res) => {
      res.status(200).json({message: "user exist"})
})

module.exports = router

