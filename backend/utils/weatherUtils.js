const axios = require("axios");

const getWeatherForCity = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

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
    return {
      condition: data.weather[0].main,
      temperature: data.main.temp,
    };
  } catch (err) {
    console.error(`Weather fetch error for ${city}:`, err.message);
    return { condition: "Unknown", temperature: null };
  }
};

module.exports = { getWeatherForCity };
