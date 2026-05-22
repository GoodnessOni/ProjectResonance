export default function TaskBOutput({ result, onReset }) {
  // Cold start case
  if (result.cold_start) {
    return (
      <div className="max-w-3xl space-y-6">
        <div className="border border-gray-700 p-8 rounded-lg bg-gray-900/50 backdrop-blur">
          <p className="text-gray-300 mb-6 text-center font-medium">
            Help us understand you better
          </p>
          <div className="space-y-4">
            {result.questions.map((q, idx) => (
              <div
                key={idx}
                className="border border-gray-700 p-6 rounded-lg bg-gray-950/50 hover:bg-gray-900/50 transition"
              >
                <p className="text-white text-sm leading-relaxed">
                  <span className="text-gray-500 font-medium">{idx + 1}.</span>{" "}
                  {q}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onReset}
          className="w-full py-3 border border-gray-700 text-white font-medium rounded-lg hover:bg-white/5 transition"
        >
          Back
        </button>
      </div>
    );
  }

  // Normal recommendations
  return (
    <div className="space-y-4">
      {result.map((rec, idx) => (
        <div
          key={idx}
          className="border border-gray-700 p-6 rounded-lg bg-gray-900/50 backdrop-blur hover:bg-gray-900/80 transition duration-300 group"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-medium">
                #{rec.rank} — {rec.domain}
              </p>
              <p className="text-white font-medium text-lg mt-2 group-hover:text-gray-100 transition">
                {rec.item}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-light text-white">
                {Math.round(rec.score * 100)}%
              </p>
              <p className="text-gray-500 text-xs">match</p>
            </div>
          </div>

          {/* Reason */}
          <p className="text-gray-400 text-sm leading-relaxed">{rec.reason}</p>

          {/* Progress bar */}
          <div className="mt-4 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gray-400 to-white transition-all duration-500"
              style={{ width: `${rec.score * 100}%` }}
            />
          </div>
        </div>
      ))}

      <button
        onClick={onReset}
        className="w-full py-3 border border-gray-700 text-white font-medium rounded-lg hover:bg-white/5 transition mt-6"
      >
        Find New Audience
      </button>
    </div>
  );
}
