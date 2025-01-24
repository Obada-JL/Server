const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  newsImage: {
    type: String,
  },
  newsDate: {
    type: String,
  },
  newsTitle: {
    type: String,
  },
  newsCategory: {
    type: String,
  },
  newsDescription: {
    type: String,
  },
});
module.exports = mongoose.model("news", newsSchema);
