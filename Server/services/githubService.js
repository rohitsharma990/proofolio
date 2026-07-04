const axios = require("axios");

const GITHUB_API = "https://api.github.com";

const getGithubProfile = async (username) => {
    try {

        const profileResponse = await axios.get(
            `${GITHUB_API}/users/${username}`,
            {
                headers: {
                    Authorization: process.env.GITHUB_TOKEN
                        ? `Bearer ${process.env.GITHUB_TOKEN}`
                        : undefined,
                    Accept: "application/vnd.github+json"
                }
            }
        );

        const repoResponse = await axios.get(
            `${GITHUB_API}/users/${username}/repos?per_page=100`,
            {
                headers: {
                    Authorization: process.env.GITHUB_TOKEN
                        ? `Bearer ${process.env.GITHUB_TOKEN}`
                        : undefined,
                    Accept: "application/vnd.github+json"
                }
            }
        );

        const repositories = repoResponse.data;

        // Calculate languages
        const languageCount = {};

        repositories.forEach((repo) => {
            if (repo.language) {
                languageCount[repo.language] =
                    (languageCount[repo.language] || 0) + 1;
            }
        });

        // Total Stars
        const totalStars = repositories.reduce(
            (sum, repo) => sum + repo.stargazers_count,
            0
        );

        return {
            profile: profileResponse.data,

            repositories,

            languages: languageCount,

            totalStars
        };

    } catch (error) {

        throw new Error(
            error.response?.data?.message || "GitHub API Error"
        );

    }
};

module.exports = {
    getGithubProfile
};