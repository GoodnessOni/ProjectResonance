export default function TaskAOutput({ result }) {
  const rating = result.predicted_rating;
  const confidence = result.confidence;
  const review = result.simulated_review;
  const reasoning = result.reasoning;

  // Color rating by score
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-400";
    if (rating >= 3.5) return "text-blue-400";
    if (rating >= 2.5) return "text-yellow-400";
    return "text-red-400";
  };

  // Confidence bar
  const getConfidenceColor = (conf) => {
    if (conf >= 0.85) return "bg-green-600";
    if (conf >= 0.7) return "bg-blue-600";
    if (conf >= 0.5) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="space-y-8">
      {/* RATING CARD */}
      <div className="border border-gray-700 rounded-xl p-8 bg-black">
        <p className="text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-4">
          Predicted Rating
        </p>
        <p className={`text-6xl font-light ${getRatingColor(rating)}`}>
          {rating.toFixed(1)}
        </p>
        <p className="text-xs text-gray-500 mt-2">out of 5.0</p>
      </div>

      {/* CONFIDENCE BAR */}
      <div className="border border-gray-700 rounded-xl p-6 bg-black">
        <p className="text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-4">
          Confidence Score
        </p>
        <div className="mb-2">
          <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${getConfidenceColor(confidence)} transition-all duration-300`}
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
        </div>
        <p className="text-sm font-light text-white">
          {(confidence * 100).toFixed(0)}%
        </p>
      </div>

      {/* REVIEW */}
      <div className="border border-gray-700 rounded-xl p-6 bg-black">
        <p className="text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-4">
          Simulated Review
        </p>
        <p className="text-sm font-light leading-relaxed text-gray-200 italic">
          "{review}"
        </p>
      </div>

      {/* REASONING */}
      <div className="border border-gray-700 rounded-xl p-6 bg-black">
        <p className="text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-4">
          AI Reasoning
        </p>
        <p className="text-xs font-light leading-relaxed text-gray-300">
          {reasoning}
        </p>
      </div>
    </div>
  );
}
