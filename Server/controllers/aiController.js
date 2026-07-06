const githubService = require("../services/githubService");
const geminiService = require("../services/geminiService");

const analyzePortfolio = async (req, res) => {
    try {

        const { username } = req.body;

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

            github: {
                login: githubData.profile.login,
                name: githubData.profile.name,
                avatar_url: githubData.profile.avatar_url,
                bio: githubData.profile.bio,
                followers: githubData.profile.followers,
                following: githubData.profile.following,
                public_repos: githubData.profile.public_repos,
                html_url: githubData.profile.html_url,

                totalStars: githubData.totalStars,

                languages: Object.keys(githubData.languages)
            },

            analysis: aiAnalysis

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