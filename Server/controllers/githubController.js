const githubService = require("../services/githubService.js");

const getGithubProfile = async (req, res) => {

    try {

        const { username } = req.params;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "GitHub username is required."
            });
        }

        const githubData =
            await githubService.getGithubProfile(username);

        return res.status(200).json({
            success: true,
            message: "GitHub profile fetched successfully.",
            data: githubData
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getGithubProfile
};