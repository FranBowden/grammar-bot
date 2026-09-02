require('dotenv').config();
async function getAngryGif() {
  const apiKey = process.env.GIPHY_API_KEY;

  if (!apiKey) {
    throw new Error('GIPHY_API_KEY is missing from .env');
  }

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=angry&rating=g`
  );
  const data = await response.json();

  console.log('Giphy raw response:', JSON.stringify(data, null, 2));

  if (!data.data || !data.data.images) {
    throw new Error(`Giphy API error: ${JSON.stringify(data)}`);
  }

  return data.data.images.original.url;
}

module.exports = { getAngryGif };