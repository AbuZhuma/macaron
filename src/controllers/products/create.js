const generateRandomID = require("../../helpers/genIdH");
const Product = require("../../models/product");

const createProduct = async (req, res) => {
      try {
            if (!req.files || req.files.length === 0) {
                  return res.status(400).json({message: 'No files uploaded.'});
            }
            let id = await generateRandomID(10)
            const URL = process.env.URL;
            const prodImages = req.files.map(file => ({
                  filename: file.filename,
                  originalname: file.originalname,
                  size: file.size,
                  mimetype: file.mimetype,
                  path: file.path,
                  url: `${URL}/public/${file.filename}`
            }));
            let prod = {
                  product_id: id, 
                  name: req.body.name, 
                  author: req.user.userid, 
                  desc: req.body.desc, 
                  tastes: req.body.tastes ? JSON.parse(req.body.tastes) : [], 
                  price: req.body.price, 
                  addit: req.body.addit,
                  images: prodImages
            }
            let newProduct = await Product(prod)
            newProduct.save()
            if (newProduct) {
                  res.status(200).json({ message: "Product created!", product: prod})
                  return
            }
            res.status(400).json({ message: "Please try again!"})
      } catch (error) {
            console.log(req.files);
            
            console.log(error);
            res.status(501).json({ message: "Please try again!" })
      }
}

module.exports = createProduct