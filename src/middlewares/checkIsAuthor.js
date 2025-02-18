const Product = require("../models/product");

const checkIsAuthor = async(req, res, next) => {
      try {
            let prodId = req.params.id
            let prod = await Product.findOne({product_id: prodId})
            if(prod && req.user.userid === prod.author){
                  req.product = prod
                  next()
                  return
            }
            res.status(403).json({
                  message: "You don't have acces for this product!"
            })
      } catch (error) {
            console.log(error);
            res.status(501).json({message: "Please try again!"})
      }
}

module.exports = checkIsAuthor