const User = require("../models/user")

const checkUser = async(name) => {
      const findet = await User.findOne({username: name})
      return findet
}
module.exports = checkUser