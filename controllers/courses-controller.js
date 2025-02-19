const Courses = require("../models/courses-model");

const getCourses = async (req, res) => {
  const getCourses = await Courses.find();
  res.json(getCourses);
};

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
  try {
    console.log("Received files:", req.files);
    console.log("Received body:", req.body);

    const courseMainImage = req.files["courseMainImage"]?.[0]?.filename || null;
    const courseImages =
      req.files["courseImages"]?.map((file) => file.filename) || [];

    // Parse videos and games from the request body
    const videos = req.body.videos ? JSON.parse(req.body.videos) : [];
    const games = req.body.games ? JSON.parse(req.body.games) : [];

    const newCourse = new Courses({
      courseMainImage,
      courseImages,
      mainTitle: {
        en: req.body.mainTitle_en || "",
        ar: req.body.mainTitle_ar || "",
      },
      courseField: {
        en: req.body.courseField_en || "",
        ar: req.body.courseField_ar || "",
      },
      description: {
        en: req.body.description_en || "",
        ar: req.body.description_ar || "",
      },
      videos,
      games,
    });

    const savedCourse = await newCourse.save();
    console.log("Saved course:", savedCourse);
    res.status(201).json(savedCourse);
  } catch (e) {
    console.error("Error adding course:", e);
    res.status(400).json({ error: e.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = {
      mainTitle: {
        en: req.body.mainTitle_en,
        ar: req.body.mainTitle_ar,
      },
      courseField: {
        en: req.body.courseField_en,
        ar: req.body.courseField_ar,
      },
      description: {
        en: req.body.description_en,
        ar: req.body.description_ar,
      },
    };

    // Handle file uploads if present
    if (req.files) {
      if (req.files["courseMainImage"]) {
        updateData.courseMainImage = req.files["courseMainImage"][0].filename;
      }
      if (req.files["courseImages"]) {
        updateData.courseImages = req.files["courseImages"].map(
          (file) => file.filename
        );
      }
    }

    // Handle videos and games if present
    if (req.body.videos) {
      updateData.videos = JSON.parse(req.body.videos).map((video) => ({
        url: video.url,
        title: { en: video.title_en, ar: video.title_ar },
        description: { en: video.description_en, ar: video.description_ar },
      }));
    }

    if (req.body.games) {
      updateData.games = JSON.parse(req.body.games).map((game) => ({
        url: game.url,
        title: { en: game.title_en, ar: game.title_ar },
        description: { en: game.description_en, ar: game.description_ar },
      }));
    }

    const updatedCourse = await Courses.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json(updatedCourse);
  } catch (e) {
    console.error("Error updating course:", e);
    res.status(400).json({ error: e.message });
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
