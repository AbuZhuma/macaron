const Product = require("../../models/product");

const getProductForId = async(req, res) => {
      try {
            let id = req.params.id
            let product = await Product.findOne({product_id: id})
            res.status(200).json(product)
      } catch (error) {
            console.log(error);
            res.status(501).json({message: "Please try again!"})
      }
}
module.exports = getProductForId