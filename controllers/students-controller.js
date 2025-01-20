const Students = require("../models/students-model");

const getStudents = async (req, res) => {
  const getStudents = await Students.find();
  res.json(getStudents);
};

const addStudent = async (req, res) => {
  console.log(req.files);
  const studentImage = req.files["studentImage"]
    ? req.files["studentImage"][0].filename
    : null;
  const { name, city, startDate, currentPage, riwayah, lastQuiz, note } =
    req.body;
  const newStudent = new Students({
    name,
    city,
    startDate,
    currentPage,
    riwayah,
    lastQuiz,
    note,
    studentImage,
  });
  try {
    await newStudent.save();
    res.status(201).json({ data: { project: newStudent } });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, city, startDate, currentPage, riwayah, lastQuiz, note } =
    req.body;
  const updateData = {
    name,
    city,
    startDate,
    currentPage,
    riwayah,
    lastQuiz,
    note,
    studentImage: req.files.filename,
  };
  try {
    const updatedStudent = await Students.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(201).json({ data: { project: updatedStudent } });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await Students.findByIdAndDelete(id);
    res.status(200).json({ message: "Student deleted successfuly" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
module.exports = {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
};
