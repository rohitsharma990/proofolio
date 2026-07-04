const express = require("express");

const {
    getGithubProfile
} = require("../controllers/githubController.js");

const router = express.Router();

router.get("/profile/:username", getGithubProfile);

module.exports = router;