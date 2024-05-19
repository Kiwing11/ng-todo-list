const express = require("express");
const { getTest } = require("../controllers/testController");
const router = express.Router();

// Route for test endpoint
router.get("/test", getTest);

module.exports = router;
