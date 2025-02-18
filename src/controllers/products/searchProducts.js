const Product = require("../../models/product");

const searchProducts = async (req, res) => {
      try {
            let srch = req.params.srch.split("&").map((el) => el.split(":"))
            const query = {};
            srch.forEach(([key, value]) => {
                  query[key] = { $regex: value, $options: 'i' };
            });
            const products = await Product.find(query);
            res.status(200).json(products)
      } catch (error) {
            console.log(error);
            res.status(501).json({ message: "Please try again!" })
      }
}
module.exports = searchProducts