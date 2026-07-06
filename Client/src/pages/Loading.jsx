import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Loading() {
  const navigate = useNavigate();
  const location = useLocation();

  const username = location.state?.username;

  const [message, setMessage] = useState("Connecting to GitHub...");

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    const messages = [
      "Connecting to GitHub...",
      "Reading repositories...",
      "Analyzing commits...",
      "Gemini AI is thinking...",
      "Generating portfolio report...",
    ];

    let index = 0;

    const interval = setInterval(() => {
      if (index < messages.length - 1) {
        index++;
        setMessage(messages[index]);
      }
    }, 700);

    const analyze = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/ai/analyze",
          {
            username,
          }
        );

        clearInterval(interval);

        navigate("/dashboard", {
          state: data,
          replace: true,
        });
      } catch (err) {
        console.error(err);
        clearInterval(interval);
        alert("Unable to analyze profile.");
        navigate("/");
      }
    };

    analyze();

    return () => clearInterval(interval);
  }, [username, navigate]);

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col justify-center items-center text-white">

      <div className="w-24 h-24 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

      <h1 className="text-4xl font-bold mt-10">
        AI Portfolio Analysis
      </h1>

      <p className="mt-6 text-xl text-purple-300 animate-pulse">
        {message}
      </p>

    </div>
  );
}

export default Loading;