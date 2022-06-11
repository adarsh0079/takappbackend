const Article = require("../models/Article");
const Author = require("../models/Author");
const Technology = require("../models/Technology");

module.exports = {
  filter: async (req, res) => {
    try {
      let { searchText, technologies, authors, sortBy } = req.body;
      let filterObj = {};

      if (searchText) {
        filterObj.$or = [
          { content: { $regex: searchText, $options: "i" } },
          { title: { $regex: searchText, $options: "i" } },
        ];
      }
      if (technologies.length > 0) {
        filterObj["technology"] = { $in: technologies };
      }
      if (authors.length > 0) {
        filterObj["author"] = { $in: authors };
      }
      let callback = {};
      if (sortBy === -1) {
        callback.createdAt = -1; // most recent
      }
      let response = await Article.find(filterObj, null, { sort: callback });
      res.status(200).json({ msg: "success", articles: response });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  postArticle: async (req, res) => {
    try {
      let author = await Author.findOneAndUpdate(
        { author: req.body.author },
        { author: req.body.author },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
      let tech = await Technology.findOneAndUpdate(
        { technology: req.body.technology },
        { technology: req.body.technology },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
      let article = await Article.create(req.body);
      res.status(200).json({ msg: "success" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
