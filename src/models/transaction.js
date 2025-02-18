const mongoose = require("mongoose")
const tranzSchema = new mongoose.Schema({   
   author: { type: String, required: true}, 
   date: { type: String, required: true},
   check: { type: String, required: true},
   trans_id: { type: String, required: true, unique: true},
})

const Tranzition = mongoose.model('transaction', tranzSchema, "transactions");      

module.exports = Tranzition