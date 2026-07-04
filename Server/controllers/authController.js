const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Generate JWT Token

const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in .env");
    }

    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

//Register User


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body || {};

        const userName = name?.trim();
        const userEmail = email?.trim().toLowerCase();

        // Validation
        if (!userName || !userEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters."
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: userEmail });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered."
            });
        }

        // Password will be hashed automatically by the User model
        const user = await User.create({
            name: userName,
            email: userEmail,
            password
        });

        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                githubUsername: user.githubUsername,
                profileImage: user.profileImage,
                bio: user.bio,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

//Login User

const loginUser = async (req, res) => {

    try {

        let { email, password } = req.body;

        email = email?.trim().toLowerCase();

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        // Fetch password because select:false
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Compare Password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                githubUsername: user.githubUsername,
                profileImage: user.profileImage,
                bio: user.bio
            }
        });

    } catch (error) {

        console.error(error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });

    }

};

module.exports = {
    registerUser,
    loginUser
};