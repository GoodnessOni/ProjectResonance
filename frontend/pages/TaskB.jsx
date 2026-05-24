import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskBOutput from "./TaskBOutput";
import { findAudience } from "../api/client";
import { useAuth } from "../context/AuthContext";
import {
  saveRecommendationB,
  getRecommendationHistoryB,
} from "../src/firestore-helpers";

export default function TaskB() {
  const { user } = useAuth();
  const [persona, setPersona] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    const data = await getRecommendationHistoryB(user.uid);
    setHistory(data);
  };

  const validateInputs = () => {
    if (!persona.trim() || persona.trim().length < 10) {
      setError("Project description must be at least 10 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await findAudience(persona);
      if (data.error) {
        setError(data.message || "Something went wrong");
      } else {
        setResult(data);
        await saveRecommendationB(user.uid, persona, data);
        await loadHistory();
      }
    } catch (err) {
      setError("Failed to get recommendations. Try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-light tracking-tight mb-3">
            Find Your Audience
          </h1>
          <p className="text-gray-500 text-sm font-light">
            Discover who would genuinely love your project.
          </p>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-3">
                Your Project
              </label>
              <textarea
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                placeholder="E.g., Swift study app for Nigerian students. Offline-first. Collaborative notes. AI summaries. Dark mode. Free for students. Focus on accessibility."
                className="w-full h-40 p-5 bg-black border border-gray-700 rounded-xl text-white text-sm placeholder-gray-700 focus:border-gray-500 focus:outline-none resize-none font-light transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                {persona.length}/10 min
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 border border-red-900/50 bg-red-900/10 rounded-xl text-red-400 text-xs font-light">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black text-sm font-light rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {loading ? "Finding Audience..." : "Get Recommendations"}
            </button>

            {/* History Toggle */}
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="w-full text-xs text-gray-500 hover:text-gray-300 transition font-light"
            >
              {showHistory ? "Hide" : "Show"} search history ({history.length})
            </button>

            {/* History List */}
            {showHistory && (
              <div className="max-h-64 overflow-y-auto space-y-2 border border-gray-700 rounded-xl p-4">
                {history.length === 0 ? (
                  <p className="text-gray-600 text-xs font-light">
                    No searches yet
                  </p>
                ) : (
                  history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setResult(item.recommendations)}
                      className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-900 transition text-xs font-light"
                    >
                      <p className="text-gray-400 line-clamp-2 mb-1">
                        {item.persona}
                      </p>
                      <span className="text-gray-600">
                        {new Date(item.createdAt.toDate()).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </form>
        ) : (
          <div>
            <TaskBOutput
              result={result}
              onReset={() => {
                setResult(null);
                setPersona("");
              }}
            />
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-3 max-w-3xl">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="border border-gray-700 p-6 rounded-xl bg-gray-900/50 animate-pulse h-24"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
