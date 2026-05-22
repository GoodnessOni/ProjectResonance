import { useState } from "react";
import Navbar from "../components/Navbar";
import TaskAOutput from "./TaskAOutput";
import { predictRating } from "../api/client";

export default function TaskA() {
  const [persona, setPersona] = useState("");
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!persona.trim() || !product.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await predictRating(persona, product);
      if (data.error) {
        setError(data.message || "Something went wrong");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to get prediction. Try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-light tracking-tight mb-3">
            Predict Rating
          </h1>
          <p className="text-gray-500 text-sm font-light">
            See how a specific user would rate your project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* INPUT FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Persona Input */}
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-3">
                User Persona
              </label>
              <textarea
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                placeholder="E.g., Nigerian backend engineer, 28, Lagos. 5 years fintech. Rates harshly on security. Writes short technical reviews in Pidgin + English."
                className="w-full h-32 p-5 bg-black border border-gray-700 rounded-xl text-white text-sm placeholder-gray-700 focus:border-gray-500 focus:outline-none resize-none font-light transition"
              />
            </div>

            {/* Product Input */}
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-3">
                Product Description
              </label>
              <textarea
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="E.g., Paystack-Easy v2.0 — Python library. Handles webhooks, retries, detailed error logs. Supports Python 3.8+. 200+ GitHub stars. Active maintenance."
                className="w-full h-32 p-5 bg-black border border-gray-700 rounded-xl text-white text-sm placeholder-gray-700 focus:border-gray-500 focus:outline-none resize-none font-light transition"
              />
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
              {loading ? "Predicting..." : "Get Prediction"}
            </button>
          </form>

          {/* OUTPUT DISPLAY */}
          <div>
            {loading && (
              <div className="space-y-6">
                <div className="border border-gray-700 p-12 rounded-xl bg-gray-900/50 animate-pulse h-40" />
                <div className="border border-gray-700 p-8 rounded-xl bg-gray-900/50 animate-pulse h-32" />
                <div className="border border-gray-700 p-6 rounded-xl bg-gray-900/50 animate-pulse h-24" />
              </div>
            )}
            {result && <TaskAOutput result={result} />}
            {!loading && !result && (
              <div className="text-gray-600 text-center py-16 text-sm font-light">
                Fill in the form and submit to see predictions
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
