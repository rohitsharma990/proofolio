import { useState } from "react";
import { FaGithub, FaRobot, FaChartLine, FaBriefcase } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Landing() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const analyzePortfolio = async () => {
    if (!username.trim()) {
      alert("Please enter a GitHub username.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/ai/analyze",
        {
          username,
        }
      );
      

      navigate("/dashboard", {
        state: data,
      });
    } catch (error) {
      console.log(error);
      alert("Unable to analyze profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* Background Blur */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700 rounded-full blur-[180px] opacity-30"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-700 rounded-full blur-[180px] opacity-30"></div>

      {/* Navbar */}

      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 flex justify-center items-center">

            <HiSparkles size={22} />

          </div>

          <h1 className="text-2xl font-bold">
            Proofolio
          </h1>

        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 border border-white/20 px-5 py-2 rounded-full hover:bg-white hover:text-black duration-300"
        >
          <FaGithub />
          GitHub
        </a>

      </nav>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 pt-12 pb-24">

        <div className="text-center">

          <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/10 text-sm">

            AI + GitHub = Better Portfolio 🚀

          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight">

            AI Powered <br />

            <span className="bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent">

              Developer Portfolio

            </span>

          </h1>

          <p className="text-gray-400 mt-8 max-w-2xl mx-auto text-lg">

            Analyze your GitHub profile with AI and instantly receive
            portfolio insights, strengths, weaknesses, career suggestions
            and your developer score.

          </p>

        </div>

        {/* Search */}

        <div className="mt-14 max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-3 flex flex-col md:flex-row gap-3">

          <div className="flex items-center flex-1 px-4">

            <FaGithub className="text-2xl text-gray-400" />

            <input
              type="text"
              placeholder="Enter GitHub Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent outline-none px-4 py-4"
            />

          </div>

          <button
            onClick={analyzePortfolio}
            className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 duration-300"
          >

            {loading ? "Analyzing..." : "Analyze Portfolio"}

          </button>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold text-center">

          Why Proofolio?

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:-translate-y-2 duration-300">

            <FaRobot className="text-5xl text-purple-400" />

            <h3 className="mt-6 text-2xl font-semibold">

              AI Insights

            </h3>

            <p className="mt-4 text-gray-400">

              Gemini AI deeply analyzes your repositories and coding profile.

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:-translate-y-2 duration-300">

            <FaChartLine className="text-5xl text-blue-400" />

            <h3 className="mt-6 text-2xl font-semibold">

              Portfolio Score

            </h3>

            <p className="mt-4 text-gray-400">

              Get an AI generated score based on your GitHub portfolio.

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:-translate-y-2 duration-300">

            <HiSparkles className="text-5xl text-cyan-400" />

            <h3 className="mt-6 text-2xl font-semibold">

              Strengths

            </h3>

            <p className="mt-4 text-gray-400">

              Discover your strongest technical skills and coding habits.

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:-translate-y-2 duration-300">

            <FaBriefcase className="text-5xl text-yellow-400" />

            <h3 className="mt-6 text-2xl font-semibold">

              Career Roles

            </h3>

            <p className="mt-4 text-gray-400">

              AI recommends the best roles based on your GitHub profile.

            </p>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-white/10 py-8">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <h2 className="font-bold text-xl">

            Proofolio

          </h2>

          <p className="text-gray-500">

            Built for NYC CodeQuest Hackathon ❤️

          </p>

        </div>

      </footer>

    </div>
  );
}

export default Landing;