const asyncHandler = require("express-async-handler");
require("dotenv").config();
const jwt = require("jsonwebtoken");
/**
 * Middleware to validate JWT tokens.
 * Extracts the token from the Authorization header, verifies it, and attaches the decoded user to the request object.
 * If the token is valid, the middleware passes control to the next middleware/function in the stack.
 * If the token is invalid or missing, it throws an error.
 *
 * @param {Object} req - The request object, expected to contain the Authorization header with the JWT token.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware/function to execute.
 * @throws {Error} If the token is missing, invalid, or if there's an error in token verification.
 */
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });
  } else {
    throw new Error("User is not authorized or token is missing");
  }
});

module.exports = validateToken;
