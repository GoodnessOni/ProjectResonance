import { X } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../src/firebase";

export default function PredictionModal({ item, onClose, onDelete }) {
  const handleDelete = async () => {
    if (!window.confirm("Delete this prediction?")) return;

    try {
      await deleteDoc(doc(db, "predictions_a", item.id));
      console.log("✅ Prediction deleted");
      onDelete(item.id);
      onClose();
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gray-700 rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-black">
          <h2 className="text-xl font-light">Prediction Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-white">
          {/* Persona */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-2">
              User Persona
            </h3>
            <p className="text-sm font-light leading-relaxed">
              {item.persona}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-2">
              Product Description
            </h3>
            <p className="text-sm font-light leading-relaxed">
              {item.product}
            </p>
          </div>

          {/* Prediction */}
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xs uppercase tracking-[0.1em] text-gray-600 font-light mb-3">
              Prediction
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-xs mb-1">Rating</p>
                <p className="text-2xl font-light">
                  {item.prediction.predicted_rating}/5
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-1">Confidence</p>
                <p className="text-lg font-light">
                  {(item.prediction.confidence * 100).toFixed(0)}%
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-1">Review</p>
                <p className="text-sm font-light leading-relaxed bg-gray-900/50 p-3 rounded-lg">
                  {item.prediction.simulated_review}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-1">Reasoning</p>
                <p className="text-sm font-light leading-relaxed bg-gray-900/50 p-3 rounded-lg">
                  {item.prediction.reasoning}
                </p>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="border-t border-gray-700 pt-6 text-xs text-gray-500">
            {new Date(item.createdAt.toDate()).toLocaleString()}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-light border border-gray-700 rounded-lg hover:bg-white/5 transition"
          >
            Close
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 text-sm font-light bg-red-900/20 border border-red-900/50 text-red-400 rounded-lg hover:bg-red-900/30 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
