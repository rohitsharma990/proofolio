import { useLocation, useNavigate } from "react-router-dom";
import {
  FaGithub,
  FaStar,
  FaUsers,
  FaCodeBranch,
  FaArrowLeft,
  FaExternalLinkAlt,
} from "react-icons/fa";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  if (!state) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            No Analysis Found
          </h1>

          <button
            onClick={() => navigate("/")}
            className="bg-purple-600 px-8 py-3 rounded-xl hover:bg-purple-700 duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const { github, analysis } = state;

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* Navbar */}

      <nav className="border-b border-white/10 sticky top-0 backdrop-blur-xl bg-[#050816]/80 z-50">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            Proofolio
          </h1>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-purple-600 px-5 py-3 rounded-xl hover:bg-purple-700 duration-300"
          >
            <FaArrowLeft />
            Analyze Another
          </button>

        </div>

      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="space-y-8">

            {/* Profile */}

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">

              <div className="flex flex-col items-center">

                <img
                  src={github.avatar_url}
                  alt={github.login}
                  className="w-32 h-32 rounded-full border-4 border-purple-500"
                />

                <h2 className="text-3xl font-bold mt-6 text-center">
                  {github.name || github.login}
                </h2>

                <p className="text-gray-400 mt-2 text-center">
                  {github.bio || "No bio available"}
                </p>

                <a
                  href={github.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex items-center gap-2 bg-purple-600 px-5 py-3 rounded-xl hover:bg-purple-700 duration-300"
                >
                  <FaGithub />
                  View GitHub
                  <FaExternalLinkAlt size={12} />
                </a>

              </div>

            </div>

            {/* Stats */}

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">

              <h2 className="text-2xl font-bold mb-8">
                GitHub Stats
              </h2>

              <div className="grid grid-cols-2 gap-5">

                <div className="bg-black/20 rounded-2xl p-5">
                  <FaUsers className="text-purple-400 text-3xl" />
                  <h3 className="text-3xl font-bold mt-4">
                    {github.followers}
                  </h3>
                  <p className="text-gray-400">
                    Followers
                  </p>
                </div>

                <div className="bg-black/20 rounded-2xl p-5">
                  <FaGithub className="text-blue-400 text-3xl" />
                  <h3 className="text-3xl font-bold mt-4">
                    {github.public_repos}
                  </h3>
                  <p className="text-gray-400">
                    Repositories
                  </p>
                </div>

                <div className="bg-black/20 rounded-2xl p-5">
                  <FaStar className="text-yellow-400 text-3xl" />
                  <h3 className="text-3xl font-bold mt-4">
                    {github.totalStars}
                  </h3>
                  <p className="text-gray-400">
                    Stars
                  </p>
                </div>

                <div className="bg-black/20 rounded-2xl p-5">
                  <FaCodeBranch className="text-green-400 text-3xl" />
                  <h3 className="text-3xl font-bold mt-4">
                    {github.languages.length}
                  </h3>
                  <p className="text-gray-400">
                    Languages
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="lg:col-span-2 space-y-8">

            {/* Portfolio Score */}

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-10">

              <p className="uppercase tracking-[8px] text-sm">
                Portfolio Score
              </p>

              <h1 className="text-8xl font-black mt-4">
                {analysis.portfolioScore}
              </h1>

              <p className="text-xl mt-4">
                {
                  analysis.portfolioScore >= 90
                    ? "🥇 Gold Developer"
                    : analysis.portfolioScore >= 80
                    ? "🥈 Silver Developer"
                    : analysis.portfolioScore >= 70
                    ? "🥉 Bronze Developer"
                    : "🚀 Rising Developer"
                }
              </p>

            </div>

            {/* Summary */}

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">

              <h2 className="text-3xl font-bold mb-6">
                AI Summary
              </h2>

              <p className="text-gray-300 leading-8">
                {analysis.summary}
              </p>

            </div>
            {/* Strengths */}

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">

              <h2 className="text-3xl font-bold mb-6 text-green-400">
                💪 Strengths
              </h2>

              <div className="space-y-4">

                {analysis.strengths.map((item, index) => (

                  <div
                    key={index}
                    className="bg-green-500/10 border border-green-500/20 rounded-xl p-5"
                  >
                    {item}
                  </div>

                ))}

              </div>

            </div>

            {/* Weaknesses */}

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">

              <h2 className="text-3xl font-bold mb-6 text-red-400">
                ❌ Weaknesses
              </h2>

              <div className="space-y-4">

                {analysis.weaknesses.map((item, index) => (

                  <div
                    key={index}
                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-5"
                  >
                    {item}
                  </div>

                ))}

              </div>

            </div>

            {/* Recommendations */}

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">

              <h2 className="text-3xl font-bold mb-6 text-yellow-400">
                💡 Recommendations
              </h2>

              <div className="space-y-4">

                {analysis.recommendations.map((item, index) => (

                  <div
                    key={index}
                    className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5"
                  >
                    {item}
                  </div>

                ))}

              </div>

            </div>

            {/* Best Roles */}

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">

              <h2 className="text-3xl font-bold mb-6 text-cyan-400">
                🎯 Best Roles
              </h2>

              <div className="flex flex-wrap gap-4">

                {analysis.bestRoles.map((role, index) => (

                  <div
                    key={index}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 font-semibold"
                  >
                    {role}
                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <footer className="border-t border-white/10 mt-16">

        <div className="max-w-7xl mx-auto py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <h2 className="text-xl font-bold">
            Proofolio
          </h2>

          <p className="text-gray-500 text-center">
            AI Powered Developer Portfolio Analyzer • Built with ❤️ using React, Express & Gemini AI
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Dashboard;