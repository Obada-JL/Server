const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  courseMainImage: {
    type: String,
  },
  mainTitle: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  courseField: {
    en: { type: String },
    ar: { type: String },
  },
  description: {
    en: { type: String },
    ar: { type: String },
  },
  videos: [
    {
      url: String,
      title: {
        en: String,
        ar: String,
      },
      description: {
        en: String,
        ar: String,
      },
    },
  ],
  games: [
    {
      url: String,
      title: {
        en: String,
        ar: String,
      },
      description: {
        en: String,
        ar: String,
      },
    },
  ],
  courseImages: {
    type: [String],
  },
});

module.exports = mongoose.model("courses", coursesSchema);
