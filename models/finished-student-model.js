const mongoose = require("mongoose");
const { type } = require("os");

const finishedStudentsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  riwayah: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  note: {
    type: String,
  },
  finishedStudentImage: {
    type: String,
  },
});
module.exports = mongoose.model("finishedStudents", finishedStudentsSchema);
