const Categorys = require("../models/categorys-model");

const getCategorys = async (req, res) => {
  const getCategorys = await Categorys.find();
  res.json(getCategorys);
};

const addCategory = async (req, res) => {
  const categoryImage = req.files["categoryImage"]
    ? req.files["categoryImage"][0].filename
    : null;
  const { categoryTitle } = req.body;
  console.log(categoryImage, categoryTitle);
  const newCategory = new Categorys({
    categoryTitle,
    categoryImage,
  });
  try {
    await newCategory.save();
    res.status(201).json({ data: { project: newCategory } });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};
const updateCategory = async (req, res) => {
  const categoryImage = req.files["categoryImage"]
    ? req.files["categoryImage"][0].filename
    : null;
  const { id } = req.params;
  const { categoryTitle } = req.body;
  const updateData = {
    categoryTitle,
    categoryImage,
  };
  try {
    const updatedCategory = await Categorys.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(201).json({ data: { project: updatedCategory } });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Categorys.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfuly" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
module.exports = {
  getCategorys,
  addCategory,
  deleteCategory,
  updateCategory,
};
