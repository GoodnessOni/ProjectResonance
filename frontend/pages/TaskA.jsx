import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskAOutput from "./TaskAOutput";
import PredictionModal from "../components/PredictionModal";
import { predictRating } from "../api/client";
import { useAuth } from "../context/AuthContext";
import {
  savePredictionA,
  getPredictionHistoryA,
} from "../src/firestore-helpers";

const INAPPROPRIATE_KEYWORDS = [
  "pornstar",
  "porn",
  "sex",
  "nyash",
  "booty",
  "ass",
  "naked",
  "nude",
  "xxx",
  "adult",
  "explicit",
];

const validateQuality = (text) => {
  const lower = text.toLowerCase();

  if (INAPPROPRIATE_KEYWORDS.some((keyword) => lower.includes(keyword))) {
    return { valid: false, message: "Input contains inappropriate content" };
  }

  if (/(.)\1{4,}/.test(text)) {
    return { valid: false, message: "Input appears to be gibberish" };
  }

  const specialCount = (text.match(/[^a-zA-Z0-9\s,.\-]/g) || []).length;
  if (specialCount > text.length * 0.2) {
    return { valid: false, message: "Too many special characters" };
  }

  const words = text.split(/\s+/);
  const randomWords = words.filter((word) => {
    if (word.length < 3) return false;
    const hasVowel = /[aeiouAEIOU]/.test(word);
    return !hasVowel;
  });

  if (randomWords.length > words.length * 0.3) {
    return { valid: false, message: "Input appears to contain nonsense words" };
  }

  const avgWordLength =
    words.reduce((sum, w) => sum + w.length, 0) / words.length;
  if (avgWordLength < 2 || avgWordLength > 15) {
    return { valid: false, message: "Input structure looks unusual" };
  }

  return { valid: true };
};

export default function TaskA() {
  const { user } = useAuth();
  const [persona, setPersona] = useState("");
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    try {
      const data = await getPredictionHistoryA(user.uid);
      setHistory(data);
    } catch (err) {
      console.error("Error loading history:", err);
    }
  };

  const validateInputs = () => {
    const personaTrimmed = persona.trim();
    const productTrimmed = product.trim();

    if (!personaTrimmed || personaTrimmed.length < 30) {
      setError(
        "Persona must be at least 30 characters with meaningful details",
      );
      return false;
    }

    if (!productTrimmed || productTrimmed.length < 30) {
      setError("Product description must be at least 30 characters");
      return false;
    }

    const personaWords = personaTrimmed.split(/\s+/).length;
    const productWords = productTrimmed.split(/\s+/).length;

    if (personaWords < 5) {
      setError("Persona needs at least 5 words");
      return false;
    }

    if (productWords < 5) {
      setError("Product description needs at least 5 words");
      return false;
    }

    const personaQuality = validateQuality(personaTrimmed);
    if (!personaQuality.valid) {
      setError(personaQuality.message);
      return false;
    }

    const productQuality = validateQuality(productTrimmed);
    if (!productQuality.valid) {
      setError(productQuality.message);
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

    const personaSaved = persona;
    const productSaved = product;

    try {
      const data = await predictRating(personaSaved, productSaved);

      if (data.error) {
        setError(data.message || "API error");
        setLoading(false);
        return;
      }

      setResult(data);
      setLoading(false);

      setPersona("");
      setProduct("");

      savePredictionA(user.uid, personaSaved, productSaved, data)
        .then(() => {
          console.log("✅ Prediction saved successfully");
          loadHistory();
        })
        .catch((err) => {
          console.error("❌ Save error:", err);
          setError("Prediction shown but history save failed: " + err.message);
        });
    } catch (err) {
      setError(err.message || "Failed to get prediction. Try again.");
      setLoading(false);
    }
  };

  const handleDeleteHistoryItem = (deletedId) => {
    setHistory(history.filter((item) => item.id !== deletedId));
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
              <p className="text-xs text-gray-500 mt-1">
                {persona.length}/30 min
              </p>
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
              <p className="text-xs text-gray-500 mt-1">
                {product.length}/30 min
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
              {loading ? "Predicting..." : "Get Prediction"}
            </button>

            {/* History Toggle */}
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="w-full text-xs text-gray-500 hover:text-gray-300 transition font-light"
            >
              {showHistory ? "Hide" : "Show"} prediction history (
              {history.length})
            </button>

            {/* History List */}
            {showHistory && (
              <div className="max-h-64 overflow-y-auto space-y-2 border border-gray-700 rounded-xl p-4">
                {history.length === 0 ? (
                  <p className="text-gray-600 text-xs font-light">
                    No predictions yet
                  </p>
                ) : (
                  history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedHistoryItem(item)}
                      className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-900 transition text-xs font-light"
                    >
                      <p className="text-gray-400 line-clamp-1 mb-1">
                        {item.product}
                      </p>
                      <div className="flex justify-between">
                        <span className="text-white">
                          {item.prediction.predicted_rating}/5
                        </span>
                        <span className="text-gray-600">
                          {new Date(
                            item.createdAt.toDate(),
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
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
            {result && !loading && <TaskAOutput result={result} />}
            {!loading && !result && (
              <div className="text-gray-600 text-center py-16 text-sm font-light">
                Fill in the form and submit to see predictions
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedHistoryItem && (
        <PredictionModal
          item={selectedHistoryItem}
          onClose={() => setSelectedHistoryItem(null)}
          onDelete={handleDeleteHistoryItem}
        />
      )}
    </div>
  );
}
