const githubService = require("../services/githubService");
const geminiService = require("../services/geminiService");

const analyzePortfolio = async (req, res) => {

    try {

        const { username } = req.body;
        console.log("Received username:", username);

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "GitHub username is required."
            });
        }

        const githubData =
            await githubService.getGithubProfile(username);

        const aiAnalysis =
            await geminiService.analyzeGithubProfile(githubData);

        return res.status(200).json({
            success: true,
            data: aiAnalysis
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    analyzePortfolio
};