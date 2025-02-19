const News = require("../models/news-model");

const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const addNew = async (req, res) => {
  try {
    const newsImage = req.files?.["newsImage"]?.[0]?.filename || null;

    const newNews = new News({
      newsImage,
      newsDate: req.body.newsDate,
      newsTitle: {
        en: req.body.newsTitle_en,
        ar: req.body.newsTitle_ar,
      },
      newsCategory: {
        en: req.body.newsCategory_en,
        ar: req.body.newsCategory_ar,
      },
      newsDescription: {
        en: req.body.newsDescription_en,
        ar: req.body.newsDescription_ar,
      },
    });

    await newNews.save();
    res.status(201).json(newNews);
  } catch (e) {
    console.error("Error in addNew:", e);
    res.status(400).json({ error: e.message });
  }
};

const updateNew = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = {
      newsDate: req.body.newsDate,
      newsTitle: {
        en: req.body.newsTitle_en,
        ar: req.body.newsTitle_ar,
      },
      newsCategory: {
        en: req.body.newsCategory_en,
        ar: req.body.newsCategory_ar,
      },
      newsDescription: {
        en: req.body.newsDescription_en,
        ar: req.body.newsDescription_ar,
      },
    };

    if (req.files?.["newsImage"]) {
      updateData.newsImage = req.files["newsImage"][0].filename;
    }

    const updatedNews = await News.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedNews) {
      return res.status(404).json({ error: "News not found" });
    }
    res.status(200).json(updatedNews);
  } catch (e) {
    console.error("Error updating news:", e);
    res.status(400).json({ error: e.message });
  }
};

const deleteNew = async (req, res) => {
  const { id } = req.params;
  try {
    await News.findByIdAndDelete(id);
    res.status(200).json({ message: "New deleted successfuly" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
module.exports = {
  getNews,
  addNew,
  deleteNew,
  updateNew,
};
