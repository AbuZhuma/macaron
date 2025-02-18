const express = require('express');
const Product = require('../models/product');
const authenticateJWT = require('../middlewares/checkToken');
const createProduct = require('../controllers/products/create');
const { upload } = require('../middlewares/uploadImages');
const editProduct = require('../controllers/products/putch');
const checkIsAuthor = require('../middlewares/checkIsAuthor');
const getProductForId = require('../controllers/products/getForId');
const searchProducts = require('../controllers/products/searchProducts');
const editPhotos = require('../controllers/products/editPhotos');
const router = express.Router();

router.post("/", authenticateJWT, upload.array('image'), createProduct)
router.patch("/:id", authenticateJWT, checkIsAuthor, editProduct)
router.get("/:id", getProductForId)
router.get("/q/:srch", searchProducts)
router.patch("/i/:id",  authenticateJWT, checkIsAuthor, upload.single('image'), editPhotos)
router.get("/", async(req, res) => {
      let allProducts = await Product.find({})
      res.status(200).json(allProducts) 
})

module.exports = router