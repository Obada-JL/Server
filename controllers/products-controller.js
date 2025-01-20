const Products = require("../models/products-model");

const getProducts = async (req, res) => {
  const getProducts = await Products.find();
  res.json(getProducts);
};

const addProduct = async (req, res) => {
  const SliderImages = req.files["sliderImages"]
    ? req.files["sliderImages"].map((file) => file.filename)
    : [];
  const MainImage = req.files["mainImage"]
    ? req.files["mainImage"][0].filename
    : null;
  const { name, title, description, features } = req.body;
  const newProduct = new Products({
    name,
    title,
    mainImage: MainImage,
    sliderImages: SliderImages,
    description,
    features,
  });
  try {
    await newProduct.save();
    res.status(201).json({ data: { project: newProduct } });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, title, description, features } = req.body;

  let updateData = {
    name,
    title,
    description,
    features,
  };

  // Handle new image uploads if they exist
  if (req.files) {
    if (req.files["mainImage"]) {
      updateData.mainImage = req.files["mainImage"][0].filename;
    }
    if (req.files["sliderImages"]) {
      updateData.sliderImages = req.files["sliderImages"].map(
        (file) => file.filename
      );
    }
  }

  try {
    const updatedProduct = await Products.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(201).json({ data: { project: updatedProduct } });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Products.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfuly" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};
