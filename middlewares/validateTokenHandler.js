const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let tokenHeader = req.header.Authorization || req.headers.authorization;

  if (tokenHeader && tokenHeader.includes("Bearer")) {
    token = tokenHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decode.user;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error(`Token is required`);
    }
  }
});

module.exports = validateToken;
