const mongoose = require("mongoose");
const { type } = require("os");

const studentsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  startDate: {
    type: String,
  },
  currentPage: {
    type: String,
  },
  riwayah: {
    type: String,
  },
  lastQuiz: {
    type: String,
  },
  note: {
    type: String,
  },
  studentImage: {
    type: String,
  },
});
module.exports = mongoose.model("students", studentsSchema);
