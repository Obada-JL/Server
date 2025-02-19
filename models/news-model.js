const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  newsImage: {
    type: String,
  },
  newsDate: {
    type: String,
  },
  newsTitle: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  newsCategory: {
    en: { type: String },
    ar: { type: String },
  },
  newsDescription: {
    en: { type: String },
    ar: { type: String },
  },
});

module.exports = mongoose.model("news", newsSchema);
