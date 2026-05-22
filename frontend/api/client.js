const API_URL =
  import.meta.env.VITE_API_URL || "https://projectresonance.onrender.com";

export const predictRating = async (persona, product) => {
  const response = await fetch(`${API_URL}/task-a`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ persona, product }),
  });
  return response.json();
};

export const findAudience = async (persona) => {
  const response = await fetch(`${API_URL}/task-b`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ persona }),
  });
  return response.json();
};
