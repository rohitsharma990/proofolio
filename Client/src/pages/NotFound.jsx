import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaGithub } from "react-icons/fa";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050816] relative overflow-hidden flex items-center justify-center px-6">

      {/* Background Blur */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700 rounded-full blur-[180px] opacity-30"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-700 rounded-full blur-[180px] opacity-30"></div>

      {/* Content */}

      <div className="relative z-10 max-w-2xl w-full">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center shadow-2xl">

          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex justify-center items-center">

            <FaGithub className="text-5xl text-white" />

          </div>

          <h1 className="text-[120px] md:text-[180px] font-black bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent leading-none mt-8">

            404

          </h1>

          <h2 className="text-4xl font-bold text-white mt-4">

            Lost in GitHub Space 🚀

          </h2>

          <p className="text-gray-400 mt-6 text-lg leading-8">

            The page you're looking for doesn't exist,
            has been moved, or was never committed.

          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-10 inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30"
          >
            <FaArrowLeft />

            Back to Home

          </button>

        </div>

        <p className="text-center text-gray-500 mt-8">

          © 2026 Proofolio • AI Powered Developer Portfolio Analyzer

        </p>

      </div>

    </div>
  );
}

export default NotFound;