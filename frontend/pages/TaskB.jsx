import { useState } from "react";
import Navbar from "../components/Navbar";
import TaskBOutput from "./TaskBOutput";
import { findAudience } from "../api/client";

export default function TaskB() {
  const [persona, setPersona] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await findAudience(persona);
      if (data.error) {
        setError(data.message || "Something went wrong");
      } else {
        setResult(data);
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
          <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-3">
                Your Persona
              </label>
              <textarea
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                placeholder="E.g., Chioma, 26, Abuja. Product designer at Nigerian SaaS startup. Love Figma, typography, minimalist design. Frustrated by bloated tools. Read design essays on Are.na. Follow Sagmeister, Dieter Rams. Budget: $10-20/month."
                className="w-full h-40 p-5 bg-black border border-gray-700 rounded-xl text-white text-sm placeholder-gray-700 focus:border-gray-500 focus:outline-none resize-none font-light transition"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 border border-red-900/50 bg-red-900/10 rounded-xl text-red-400 text-xs font-light mb-6">
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
