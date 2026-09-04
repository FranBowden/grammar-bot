require("dotenv").config();

//Cache gifs from Giphy to avoid hitting the API too often
const SEARCH_TERMS = ["angry", "annoyed", "nerd"];
const RESULTS_PER_TERM = 15;
const REFRESH_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

let cache = [];
let lastFetch = 0;

/**
 * Make api requests to Giphy for gifs matching the search terms and return an array of gif urls
 * 
 * @returns
 */
async function fetchGifBatch() {
  const apiKey = process.env.GIPHY_API_KEY;
  if (!apiKey) {
    throw new Error("Giphy Api key is missing");
  }

  const batches = await Promise.all(
    SEARCH_TERMS.map(async (term) => {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(term)}&limit=${RESULTS_PER_TERM}&rating=g`,
      );
      const data = await response.json();
      return (data.data || []).map((gif) => gif.images.original.url);
    }),
  );

  return batches.flat();
}

/**
 * Get more gifs from Giphy if the cache is empty or stale.
 */
async function refreshCache() {
  const urls = await fetchGifBatch();
  if (urls.length > 0) {
    cache = urls;
    lastFetch = Date.now();
  }
}

/**
 * Use cached gifs to get a random angry gif. If the cache is empty or stale, fetch more gifs from Giphy.
 * @returns
 */
async function getAngryGif() {
  const isStale = Date.now() - lastFetch > REFRESH_INTERVAL_MS;

  if (cache.length === 0 || isStale) {
    try {
      await refreshCache();
    } catch (error) {
      if (cache.length === 0) throw error;
      console.error("Giphy refresh failed, serving stale cache:", error);
    }
  }

  return cache[Math.floor(Math.random() * cache.length)];
}

module.exports = { getAngryGif };
