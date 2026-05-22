export default function TaskAOutput({ result }) {
  const rating = parseFloat(result.predicted_rating);
  const filledStars = Math.round(rating);

  return (
    <div className="space-y-6">
      {/* Big Rating Display */}
      <div className="border border-gray-700 p-12 rounded-xl bg-black relative overflow-hidden group">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="relative">
          <p className="text-gray-500 text-xs uppercase tracking-[0.15em] font-light mb-6">
            Rating Prediction
          </p>

          <div className="mb-8">
            <div className="text-7xl font-light text-white mb-2">
              {rating.toFixed(1)}
              <span className="text-3xl text-gray-600 ml-2">/5</span>
            </div>
          </div>

          {/* Star rating */}
          <div className="flex gap-3 mb-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i < filledStars
                    ? "bg-white scale-100"
                    : "bg-gray-800 scale-75"
                }`}
              />
            ))}
          </div>

          <p className="text-gray-500 text-sm">
            {Math.round(result.confidence * 100)}% confidence
          </p>
        </div>
      </div>

      {/* Simulated Review — Full width, prominent */}
      <div className="border border-gray-700 p-8 rounded-xl bg-black group hover:bg-gray-950/50 transition">
        <p className="text-gray-500 text-xs uppercase tracking-[0.15em] font-light mb-4">
          Their Voice
        </p>
        <p className="text-lg text-gray-100 leading-relaxed font-light italic">
          "{result.simulated_review}"
        </p>
      </div>

      {/* Why — smaller, supporting */}
      <div className="border border-gray-700 p-6 rounded-xl bg-gray-950/50 group">
        <p className="text-gray-600 text-xs uppercase tracking-[0.15em] font-light mb-3">
          Why
        </p>
        <p className="text-gray-400 text-sm leading-relaxed font-light">
          {result.reasoning}
        </p>
      </div>
    </div>
  );
}
