const mongoose = require("mongoose");

const categorysSchema = new mongoose.Schema({
  categoryImage: {
    type: String,
  },
  categoryTitle: {
    type: String,
  },
});
module.exports = mongoose.model("categorys", categorysSchema);
