import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

// Save Task A prediction
export const savePredictionA = async (userId, persona, product, prediction) => {
  try {
    console.log("🔵 Attempting to save prediction:", {
      userId,
      persona,
      product,
    });

    const docRef = await addDoc(collection(db, "predictions_a"), {
      userId,
      persona,
      product,
      prediction,
      createdAt: new Date(),
    });

    console.log(" Prediction saved with ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error(" Error saving prediction:", error.message, error.code);
    throw error;
  }
};

// Get Task A history
export const getPredictionHistoryA = async (userId) => {
  try {
    console.log("🔵 Loading history for user:", userId);

    const q = query(
      collection(db, "predictions_a"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);

    console.log(" Loaded history, count:", snapshot.docs.length);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(" Error fetching predictions:", error.message, error.code);
    return [];
  }
};

// Save Task B recommendation
export const saveRecommendationB = async (userId, persona, recommendations) => {
  try {
    console.log("🔵 Attempting to save recommendation:", { userId, persona });

    const docRef = await addDoc(collection(db, "recommendations_b"), {
      userId,
      persona,
      recommendations,
      createdAt: new Date(),
    });

    console.log("✅ Recommendation saved with ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("❌ Error saving recommendation:", error.message, error.code);
    throw error;
  }
};

// Get Task B history
export const getRecommendationHistoryB = async (userId) => {
  try {
    console.log("🔵 Loading recommendations for user:", userId);

    const q = query(
      collection(db, "recommendations_b"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);

    console.log("✅ Loaded recommendations, count:", snapshot.docs.length);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(
      "❌ Error fetching recommendations:",
      error.message,
      error.code,
    );
    return [];
  }
};
