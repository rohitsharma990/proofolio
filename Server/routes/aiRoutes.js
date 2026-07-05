const express = require("express");

const {
    analyzePortfolio
} = require("../controllers/aiController");

const router = express.Router();

router.post("/analyze", analyzePortfolio);

module.exports = router;