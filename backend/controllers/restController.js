const restData = require("../data/restSpots");

exports.suggestRestSpots = (req, res) => {
  const { city, travelTimeHours, activitiesCount, weather } = req.body;

  const isTired = travelTimeHours >= 3 || activitiesCount >= 3 || weather === "Rain";

  if (!isTired) {
    return res.json({ message: "No rest needed today." });
  }

  const restOptions = restData.filter(r => r.city === city);

  const hotels = restOptions.filter(r => r.type === "hotel");
  const food = restOptions.filter(r => r.type === "food");
  const relax = restOptions.filter(r => r.type === "relax");

  res.json({
    message: "Rest recommended.",
    hotel: hotels[0]?.name,
    food: food[0]?.name,
    relax: relax[0]?.name
  });
};
