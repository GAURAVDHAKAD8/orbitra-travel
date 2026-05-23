const UNSPLASH_ACCESS_KEY = "nIqa2o1_hFNTJPuYCA2ksmbBKQ6dghIYMZ9JfDuRhG8";

export const fetchPlaceImage = async (query) => {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } }
    );
    const data = await res.json();
    return data.results[0]?.urls?.regular || null;
  } catch {
    return null;
  }
};
