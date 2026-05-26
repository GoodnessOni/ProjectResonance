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

  // Check if reasoning is structured or string
  const isStructuredReasoning = typeof reasoning === "object" && reasoning !== null;

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
      {isStructuredReasoning ? (
        <div className="border border-gray-700 rounded-xl p-6 bg-black space-y-6">
          {/* Summary */}
          <div>
            <p className="text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-3">
              Why This Rating?
            </p>
            <p className="text-sm font-light leading-relaxed text-gray-200">
              {reasoning.summary}
            </p>
          </div>

          {/* Key Factors */}
          {reasoning.key_factors && reasoning.key_factors.length > 0 && (
            <div className="border-t border-gray-700 pt-6">
              <p className="text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-4">
                Key Factors
              </p>
              <div className="space-y-3">
                {reasoning.key_factors.map((factor, idx) => (
                  <div key={idx} className="bg-gray-900/50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-light text-white">
                        {factor.factor}
                      </p>
                      <p
                        className={`text-xs font-light px-2 py-1 rounded ${
                          factor.direction === "positive"
                            ? "bg-green-900/30 text-green-400"
                            : factor.direction === "negative"
                            ? "bg-red-900/30 text-red-400"
                            : "bg-gray-700/30 text-gray-300"
                        }`}
                      >
                        {factor.direction === "positive" ? "++" : factor.direction === "negative" ? "--" : "○"} {factor.weight}%
                      </p>
                    </div>
                    <p className="text-xs font-light text-gray-400 leading-relaxed">
                      {factor.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confidence Explanation */}
          {reasoning.confidence_explanation && (
            <div className="border-t border-gray-700 pt-6">
              <p className="text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-2">
                Confidence Breakdown
              </p>
              <p className="text-xs font-light text-gray-300 leading-relaxed">
                {reasoning.confidence_explanation}
              </p>
            </div>
          )}

          {/* Uncertainty Factors */}
          {reasoning.uncertainty_factors && reasoning.uncertainty_factors.length > 0 && (
            <div className="border-t border-gray-700 pt-6">
              <p className="text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-3">
                What Could Change This?
              </p>
              <ul className="space-y-2">
                {reasoning.uncertainty_factors.map((factor, idx) => (
                  <li key={idx} className="text-xs font-light text-gray-400 flex gap-2">
                    <span className="text-gray-600">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        // Fallback for old string reasoning
        <div className="border border-gray-700 rounded-xl p-6 bg-black">
          <p className="text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-4">
            AI Reasoning
          </p>
          <p className="text-xs font-light leading-relaxed text-gray-300">
            {reasoning}
          </p>
        </div>
      )}
    </div>
  );
}
