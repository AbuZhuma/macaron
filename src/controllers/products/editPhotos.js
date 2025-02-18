const Product = require("../../models/product");

const editPhotos = async(req, res) => {
      try {
            const URL = process.env.URL;
            let file = req.file
            if (!file || file === 0) {
                  return res.status(400).json({message: 'No files uploaded.'});
            }
            if(!req.body.prev){
                  return res.status(400).json({message: 'No prev send.'});   
            }
            let prodId = req.params.id
            let prodImages = req.product.images
            let newImage = {
                  filename: file.filename,
                  originalname: file.originalname,
                  size: file.size,
                  mimetype: file.mimetype,
                  path: file.path,
                  url: `${URL}/public/${file.filename}`
            }
            let remain = prodImages.map((el) => {
                  if(el.url === req.body.prev){ 
                        return newImage 
                  }else{
                        return el
                  }
            })
            console.log(remain);
            
            let prod = await Product.findOneAndUpdate({product_id: prodId}, {images: remain})
            prod.save()
            res.status(200).json({
                  message: "Image updated!"
            })
      } catch (error) {
            console.log(error);
            res.status(501).json({message: "Please try again!"})
      }
}

module.exports = editPhotos