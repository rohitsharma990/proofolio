const ai = require("../config/gemini");

const analyzeGithubProfile = async (githubData) => {

    const prompt = `
You are an expert Technical Recruiter and Senior Software Engineer.

Analyze this GitHub profile.

Profile:

${JSON.stringify(githubData, null, 2)}

Return ONLY valid JSON.

{
  "portfolioScore": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "bestRoles": []
}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    let text = response.text;

    text = text.replace(/```json/g, "")
               .replace(/```/g, "")
               .trim();

    return JSON.parse(text);
};

module.exports = {
    analyzeGithubProfile,
};