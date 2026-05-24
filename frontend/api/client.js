const API_URL =
  import.meta.env.VITE_API_URL || "https://projectresonance.onrender.com";

const fetchWithTimeout = (url, options = {}, timeout = 30000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeout),
    ),
  ]);
};

export const predictRating = async (persona, product) => {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}/task-a`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona, product }),
      },
      30000,
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to get prediction");
  }
};

export const findAudience = async (persona) => {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}/task-b`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona }),
      },
      30000,
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Failed to get recommendations");
  }
};
