const express = require("express");

const {
    registerUser,
    loginUser,
} = require("../controllers/authController");

const{ getProfile,
    updateProfile,
    deleteAccount } = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);

router.put("/profile", authMiddleware, updateProfile);

router.delete("/profile", authMiddleware, deleteAccount);

module.exports = router;