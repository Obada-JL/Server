const Products = require("../models/products-model");

const getProducts = async (req, res) => {
  const getProducts = await Products.find();
  res.json(getProducts);
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ 
      message: "Error fetching product", 
      error: error.message 
    });
  }
};

const addProduct = async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debug log
    console.log("Received files:", req.files); // Debug log

    const mainImage = req.files["mainImage"]?.[0]?.filename || null;
    const sliderImages =
      req.files["sliderImages"]?.map((file) => file.filename) || [];

    // Parse features from the request body with better error handling
    let features = {};
    if (req.body.features) {
      try {
        if (typeof req.body.features === "string") {
          features = JSON.parse(req.body.features);
        } else {
          features = req.body.features;
        }
      } catch (e) {
        console.error("Error parsing features:", e);
        console.log("Raw features data:", req.body.features);
      }
    }

    const productData = {
      mainImage,
      sliderImages,
      title: {
        en: req.body.title_en || "",
        ar: req.body.title_ar || "",
      },
      name: {
        en: req.body.name_en || "",
        ar: req.body.name_ar || "",
      },
      description: {
        en: req.body.description_en || "",
        ar: req.body.description_ar || "",
      },
      features,
    };

    console.log("Creating product with data:", productData); // Debug log

    const newProduct = new Products(productData);
    const savedProduct = await newProduct.save();

    console.log("Saved product:", savedProduct); // Debug log
    res.status(201).json(savedProduct);
  } catch (e) {
    console.error("Error adding product:", e);
    res.status(400).json({
      error: e.message,
      stack: e.stack,
      details: "Error occurred while saving product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let features = {};

    try {
      const featuresData = JSON.parse(req.body.features);
      features = {
        dimensions: featuresData.dimensions || { en: "", ar: "" },
        pageCount: featuresData.pageCount || { en: "", ar: "" },
        publishingPlace: featuresData.publishingPlace || { en: "", ar: "" },
        edition: featuresData.edition || { en: "", ar: "" },
        publishDate: featuresData.publishDate || { en: "", ar: "" },
        language: featuresData.language || { en: "", ar: "" },
      };
    } catch (e) {
      console.error("Error parsing features during update:", e);
    }

    let updateData = {
      title: {
        en: req.body.title_en,
        ar: req.body.title_ar,
      },
      name: {
        en: req.body.name_en,
        ar: req.body.name_ar,
      },
      description: {
        en: req.body.description_en,
        ar: req.body.description_ar,
      },
      features,
    };

    // Handle files
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

    const updatedProduct = await Products.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (e) {
    console.error("Error updating product:", e);
    res.status(400).json({ error: e.message });
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
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
