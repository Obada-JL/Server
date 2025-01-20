const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.fieldname === "studentImage" ||
      file.fieldname === "finishedStudentImage"
    ) {
      cb(null, "uploads/studentsImages");
    } else if (
      file.fieldname === "courseMainImage" ||
      file.fieldname === "courseImages"
    ) {
      cb(null, "uploads/courseImages");
    } else if (
      file.fieldname === "mainImage" ||
      file.fieldname === "sliderImages"
    ) {
      cb(null, "uploads/productsImages");
    } else if (file.fieldname === "categoryImage") {
      cb(null, "uploads/categoryImages");
    } else {
      cb(null, "uploads/others");
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (file.fieldname === "studentImage") {
      cb(null, `${req.body.name}-${file.fieldname}${ext}`);
    } else if (file.fieldname === "finishedStudentImage") {
      cb(null, `${req.body.name}-${file.fieldname}${ext}`);
    } else if (file.fieldname === "courseImages") {
      cb(null, `${req.body.mainTitle}-${file.fieldname}${ext}`);
    } else if (file.fieldname === "courseMainImage") {
      console.log(file);
      cb(null, `${file.originalname}-${file.fieldname}${ext}`); // just temporarly
    } else if (
      file.fieldname === "mainImage" ||
      file.fieldname === "sliderImages"
    ) {
      console.log("request name", req.name);
      console.log("request body name", req.body.name);
      cb(null, `${req.body.name}-${file.fieldname}-${Date.now()}${ext}`);
    } else if (file.fieldname === "categoryImage") {
      cb(null, `${req.body.categoryTitle}-${file.fieldname}${ext}`);
    } else {
      cb(null, `${file.originalname}${ext}`);
    }
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const studentUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([{ name: "studentImage", maxCount: 1 }]);
const FinishedStudentUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([{ name: "finishedStudentImage", maxCount: 1 }]);
const productUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: { fileSize: 5 * 1024 * 1024 },
}).fields([{ name: "mainImage", maxCount: 1 }, { name: "sliderImages" }]);
const categoryUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([{ name: "categoryImage", maxCount: 1 }]);
const courseUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: { fileSize: 5 * 1024 * 1024 },
}).fields([{ name: "courseMainImage", maxCount: 1 }, { name: "courseImages" }]);

module.exports = {
  studentUpload,
  productUpload,
  categoryUpload,
  courseUpload,
  FinishedStudentUpload,
};
