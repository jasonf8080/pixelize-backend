const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || "supersecret",
    { expiresIn: process.env.JWT_LIFETIME || "7d" }
  );
};

module.exports = generateToken;
