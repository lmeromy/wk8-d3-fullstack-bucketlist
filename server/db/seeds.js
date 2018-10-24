use leahs_wishlist;
db.dropDatabase();

db.places.insertMany([
  {
    attraction: "Alpe-Adria Trail",
    location: "Central Europe",
    country: ["Austria", "Slovenia", "Italy"],
    category: "Mother Nature"
  },
  {
    attraction: "Mt. Fuji",
    country: "Japan",
    category: "Mother Nature"
  },
  {
    attraction: "Wadi Shab",
    country: "Oman",
    category: "Mother Nature"
  },
  {
    location: "Bruges",
    country: "Belgium",
    category: "City"
  }
]);
