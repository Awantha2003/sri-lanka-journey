// backend/utils/weatherUtils.js

const axios = require("axios");

const getWeatherForCity = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  // Check for missing API key or city
  if (!apiKey) {
    console.error("❌ Missing OpenWeather API key in environment variables.");
    return { condition: "Unknown", temperature: null };
  }

  if (!city) {
    console.error("❌ City is required to fetch weather.");
    return { condition: "Unknown", temperature: null };
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric"
        }
      }
    );

    const data = response.data;

    // Defensive check in case the structure is malformed
    if (!data.weather || !data.weather.length || !data.main) {
      console.warn(`⚠️ Incomplete weather data for ${city}:`, data);
      return { condition: "Unknown", temperature: null };
    }

    return {
      condition: data.weather[0].main,
      temperature: data.main.temp,
    };
  } catch (err) {
    console.error(`🌩️ Weather fetch error for ${city}:`, err.response?.data || err.message);
    return { condition: "Unknown", temperature: null };
  }
};

module.exports = { getWeatherForCity };
