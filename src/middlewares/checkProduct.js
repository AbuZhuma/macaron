const checkProduct = async(req, res, next) => {
      try {
            const {name, desc, tastes, price, addit} = req.body
            if(!name || name.length < 5){
                  res.status(400).json({message: "Invalid name of product!"})
                  return
            }
            if(!desc || desc.length < 20){
                  res.status(400).json({message: "Invalid desc of product!"})
                  return
            }
            if(!price){
                  res.status(400).json({message: "Invalid price of product!"})
                  return
            }
            next()
      } catch (error) {
            console.log(error);
            res.status(501).json({message: "Please try again!"})
      }
}
module.exports = checkProduct