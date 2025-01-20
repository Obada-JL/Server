const FinishedStudents = require("../models/finished-student-model");

const getStudents = async (req, res) => {
  const getStudents = await FinishedStudents.find();
  res.json(getStudents);
};

const addStudent = async (req, res) => {
  console.log(req.files);
  const finishedStudentImage = req.files["finishedStudentImage"]
    ? req.files["finishedStudentImage"][0].filename
    : null;
  const { name, city, riwayah, startDate, endDate, note } = req.body;
  const newStudent = new FinishedStudents({
    name,
    city,
    riwayah,
    startDate,
    endDate,
    note,
    finishedStudentImage,
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
  const { name, city, riwayah, startDate, endDate, note } = req.body;
  const updateData = {
    name,
    city,
    riwayah,
    startDate,
    endDate,
    note,
    finishedStudentImage: req.files.filename,
  };
  try {
    const updatedStudent = await FinishedStudents.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );
    res.status(201).json({ data: { project: updatedStudent } });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await FinishedStudents.findByIdAndDelete(id);
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
