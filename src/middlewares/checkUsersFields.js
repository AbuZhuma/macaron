const User = require("../models/user");

const checkUsersFields = async (req, res, next) => {
  const opt = {
    username: {
      min: 4,
      max: 30,
      type: "string",
      includes: "",
    },
    password: {
      min: 5,
      max: 30,
      type: "string",
      includes: "",
    },
    city: {
      min: 4,
      max: 20,
      type: "string",
      includes: "",
    },
    email: {
      min: 4,
      max: 30,
      type: "string",
      includes: "@",
    },
    company: {
      min: 4,
      max: 30,
      type: "string",
      includes: "",
    },
    phone: {
      min: 7,
      max: 30,
      type: "string",
      includes: "",
    },
  };

  try {
    const isExist = await User.findOne({ username: req.body.username });
    if (isExist) {
      return res.status(400).json({message: "User with this name already exists!"});
    }

    const arrBody = Object.entries(req.body);
    for (const [key, val] of arrBody) {
      const op = opt[key];
      if (!op) {
        return res.status(400).json({ message: `Invalid field: ${key}` });
      }

      if (
        val.length > op.max ||
        val.length < op.min ||
        !val.includes(op.includes)
      ) {
        return res.status(400).json({
          message: `Invalid ${key} field, must be (length > ${op.min} && length < ${op.max} && includes(${op.includes}))`,
        });
      }
    }

    next();
  } catch (error) {
    console.error("Error in checkUsersFields:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = checkUsersFields;