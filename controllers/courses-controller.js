const Courses = require("../models/courses-model");

const getCourses = async (req, res) => {
  const getCourses = await Courses.find();
  res.json(getCourses);
};
// const getCourse = async (req, res) => {
//   const { id } = req.params;
//   const course = await Courses.findById(id);
//   console.log(course);
//   res.json(course);
// };
const getCourse = async (req, res) => {
  try {
    const { id } = req.params; // Extract _id from the request parameters

    // Validate the _id format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid _id format." });
    }

    // Fetch the course by _id
    const course = await Courses.findById(id);

    // Check if the course exists
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Return the course data
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the course.", error });
  }
};

const addCourse = async (req, res) => {
  const courseImages = req.files["courseImages"]
    ? req.files["courseImages"].map((file) => file.filename)
    : [];
  console.log(req.files["courseImages"]);
  const courseMainImage = req.files["courseMainImage"]
    ? req.files["courseMainImage"][0].filename
    : null;
  const { mainTitle, videos, videosTitles, games, gameTitles, courseField } =
    req.body;
  const newCourse = new Courses({
    mainTitle,
    videos,
    courseField,
    courseMainImage,
    courseImages,
    videosTitles,
    games,
    gameTitles,
  });
  try {
    await newCourse.save();
    res.status(201).json({ data: { project: newCourse } });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};
const updateCourse = async (req, res) => {
  const courseImages = req.files["courseImages"]
    ? req.files["courseImages"].map((file) => file.filename)
    : [];
  const courseMainImage = req.files["courseMainImage"]
    ? req.files["courseMainImage"][0].filename
    : null;
  const { id } = req.params;
  const { mainTitle, videos, videosTitles, games, gameTitles, courseField } =
    req.body;
  const updateData = {
    mainTitle,
    videos,
    courseField,
    courseMainImage,
    courseImages,
    videosTitles,
    games,
    gameTitles,
  };
  try {
    const updatedCourse = await Courses.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(201).json({ data: { project: updatedCourse } });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    await Courses.findByIdAndDelete(id);
    res.status(200).json({ message: "Course deleted successfuly" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
module.exports = {
  getCourses,
  getCourse,
  addCourse,
  deleteCourse,
  updateCourse,
};
