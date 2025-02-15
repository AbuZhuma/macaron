const mongoose = require("mongoose")
const producSchema = new mongoose.Schema({   
   author: { type: String, required: true}, 
   product_id: { type: String, required: true, unique: true }, 
   images: { type: [{
      filename: { type: String },
      originalname: { type: String },
      mimetype: { type: String },
      path: { type: String },
      url:  { type: String }
   }], required: true },   
   name: { type: String, required: true }, 
   desc: { type: String, required: true }, 
   tastes: { type: [{
      taste: { type: String },
      count: { type: Number }
   }]}, 
   price: { type: String, required: true },
   addit: { type: [{
      title: { type: String },
      text: { type: String }
   }]}
})

const Product = mongoose.model('product', producSchema, "products");      

module.exports = Product