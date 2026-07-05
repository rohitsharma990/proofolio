const User = require("../models/User");

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });

    }
};  


const updateProfile = async (req, res) => {

    try {

        const {
            name,
            githubUsername,
            bio,
            profileImage
        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(

            req.user.id,

            {
                name,
                githubUsername,
                bio,
                profileImage
            },

            {
                new: true,
                runValidators: true
            }

        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: updatedUser
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });

    }

};   



const deleteAccount = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found."
            });

        }

        await User.findByIdAndDelete(req.user.id);

        return res.status(200).json({

            success: true,
            message: "Account deleted successfully."

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error."

        });

    }

};



module.exports = {
    getProfile,
    updateProfile,
    deleteAccount
};