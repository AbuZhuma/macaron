const express = require('express');
const Product = require('../models/product');
const authenticateJWT = require('../middlewares/checkToken');
const checkProduct = require('../middlewares/checkProduct');
const createProduct = require('../controllers/products/create');
const { upload } = require('../middlewares/uploadImages');
const router = express.Router();

router.post("/", authenticateJWT, upload.array('image'), createProduct)

router.get("/", async(req, res) => {
      let allProducts = await Product.find({})
      res.status(200).json(allProducts) 
})

module.exports = router