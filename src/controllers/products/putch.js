const Product = require("../../models/product");

const editProduct = async(req, res) => {
      try {
            let prodId = req.params.id
            let prod = await Product.findOneAndUpdate({product_id: prodId}, req.body)
            prod.save()
            res.status(200).json({
                  message: "Product updated!"
            })
      } catch (error) {
            console.log(error);
            res.status(501).json({message: "Please try again!"})
      }
}

module.exports = editProduct