const asyncHandler = require("express-async-handler");
require("dotenv").config();

/**
 * Test endpoint. Used for poking the server to see if it is up and running.
 *
 * @route GET /test
 * @access Public
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getTest = asyncHandler(async (req, res) => {
  try {
    res.status(200).json({ message: "Test ended successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { getTest };
