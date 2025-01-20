const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  mainImage: {
    type: String,
  },
  sliderImages: {
    type: [String],
  },
  title: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  // sort features like display  i want to see it in website
  features: {
    type: [String],
  },
});
module.exports = mongoose.model("products", productsSchema);
