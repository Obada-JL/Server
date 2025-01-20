const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  courseMainImage: {
    type: String,
  },
  mainTitle: {
    type: String,
  },
  courseField: {
    type: String,
  },
  videos: {
    type: [String],
  },
  videosTitles: {
    type: [String],
  },
  games: {
    type: [String],
  },
  gameTitles: {
    type: [String],
  },
  courseImages: {
    type: [String],
  },
});
module.exports = mongoose.model("courses", coursesSchema);
