require("dotenv").config();
const express = require("express");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const StudentsController = require("./controllers/students-controller");
const FinishedStudentsController = require("./controllers/finished-students-controller");
const ProductsController = require("./controllers/products-controller");
const CategorysController = require("./controllers/categorys-controller");
const CoursesController = require("./controllers/courses-controller");
const UsersController = require("./controllers/users-controller");
const MessagesController = require("./controllers/messages-controller");
const {
  studentUpload,
  productUpload,
  categoryUpload,
  courseUpload,
  FinishedStudentUpload,
} = require("./upload");
const verifyToken = require("./verifyToken");
const app = express();
const url = process.env.MONGO_URL;

// const options = {
//   key: fs.readFileSync("/etc/letsencrypt/live/kale-cafe.com/privkey.pem"),
//   cert: fs.readFileSync("/etc/letsencrypt/live/kale-cafe.com/cert.pem"),
//   ca: fs.readFileSync("/etc/letsencrypt/live/kale-cafe.com/chain.pem"),
// };

// // Create an HTTPS server with the SSL options
// https.createServer(options, app).listen(444, () => {
//   console.log("HTTPS server running on port 444");
// });

// // Optionally, redirect HTTP to HTTPS
// const http = require("http");
// http
//   .createServer((req, res) => {
//     res.writeHead(301, {
//       Location: "https://" + req.headers["host"] + req.url,
//     });
//     res.end();
//   })
//   .listen(83);

// Serve uploaded images statically
app.use(
  "/studentsImages",
  express.static(path.join(__dirname, "uploads/studentsImages"))
);
app.use(
  "/courseImages",
  express.static(path.join(__dirname, "uploads/courseImages"))
);
app.use("/others", express.static(path.join(__dirname, "uploads/others")));
app.use(
  "/productsImages",
  express.static(path.join(__dirname, "uploads/productsImages"))
);
app.use(
  "/categoryImages",
  express.static(path.join(__dirname, "uploads/categoryImages"))
);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(cors());
app.use(express.json());

//students route
app.get("/api/getStudents", StudentsController.getStudents);
app.post("/api/addStudent", studentUpload, StudentsController.addStudent);
app.put(
  "/api/updateStudent/:id",
  studentUpload,
  StudentsController.updateStudent
);
app.delete("/api/deleteStudent/:id", StudentsController.deleteStudent);
//FinishedStudents route
app.get("/api/getFinishedStudents", FinishedStudentsController.getStudents);
app.post(
  "/api/addFinishedStudent",
  FinishedStudentUpload,
  FinishedStudentsController.addStudent
);
app.put(
  "/api/updateFinishedStudent/:id",
  FinishedStudentUpload,
  FinishedStudentsController.updateStudent
);
app.delete(
  "/api/deleteFinishedStudent/:id",
  FinishedStudentsController.deleteStudent
);
// products routes
app.get("/api/getProducts", ProductsController.getProducts);
app.post("/api/addProduct", productUpload, ProductsController.addProduct);
app.put(
  "/api/updateProduct/:id",
  productUpload,
  ProductsController.updateProduct
);
app.delete("/api/deleteProduct/:id", ProductsController.deleteProduct);
// categorys routes
app.get("/api/getCategorys", CategorysController.getCategorys);
app.post("/api/addCategory", categoryUpload, CategorysController.addCategory);
app.put(
  "/api/updateCategory/:id",
  categoryUpload,
  CategorysController.updateCategory
);
app.delete("/api/deleteCategory/:id", CategorysController.deleteCategory);
// courses routes
app.get("/api/getCourses", CoursesController.getCourses);
app.get("/api/getCourse/:id", CoursesController.getCourse);
app.post("/api/addCourse", courseUpload, CoursesController.addCourse);
app.put("/api/updateCourse/:id", courseUpload, CoursesController.updateCourse);
app.delete("/api/deleteCourse/:id", CoursesController.deleteCourse);
// Messages routes
app.get("/api/getMessages", MessagesController.getAllMessages);
app.post("/api/addMessage", MessagesController.createMessage);
app.put("/api/updateMessage/:id", MessagesController.updateMessage);
app.delete("/api/deleteMessage/:id", MessagesController.deleteMessage);
// login&register
app.get("/api/users", verifyToken, UsersController.getAllUsers);
app.post(
  "/api/users/register",
  // upload.single("avatar"),
  UsersController.register
);
app.post("/api/users/signIn", UsersController.login);
// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({ message: "Resource not found" });
});
// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
