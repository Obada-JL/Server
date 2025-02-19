const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  mainImage: String,
  sliderImages: [String],
  title: {
    en: { type: String, default: "" },
    ar: { type: String, default: "" },
  },
  name: {
    en: { type: String, default: "" },
    ar: { type: String, default: "" },
  },
  description: {
    en: { type: String, default: "" },
    ar: { type: String, default: "" },
  },
  features: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      dimensions: { en: "", ar: "" },
      pageCount: { en: "", ar: "" },
      publishingPlace: { en: "", ar: "" },
      edition: { en: "", ar: "" },
      publishDate: { en: "", ar: "" },
      language: { en: "", ar: "" },
    },
  },
});

module.exports = mongoose.model("products", productsSchema);
