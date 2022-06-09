const router = require("express").Router();
const Article = require("../models/Article");
const Author = require("../models/Author");
const Technology =require('../models/Technology')
router.post("/", async (req, res) => {
  try {
    console.log("test")
    let author=await Author.findOneAndUpdate({author:req.body.author},{author:req.body.author},{upsert:true})
    let tech=await Technology.findOneAndUpdate(
      { technology: req.body.technology },
      { technology: req.body.technology },{
        upsert:true
      }
    );
    let article = await Article.create(req.body);
    console.log(author,tech,article)
    res.status(200).json({ msg: "success", article });
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post("/get-filtered", async (req, res) => {
  try {
    let { searchText, techs, authors } = req.body;
    let filterObj = {};
    console.log(req.body, "ets");
    if (searchText) {
      filterObj.$or = [{ content: { $regex: "any" } }, { title: searchText }];
    }
    if (techs) {
      filterObj["technology"] = { $in: techs };
    }
    if (authors) {
      filterObj["author"] = { $in: authors };
    }
    console.log("test", "lol");
    console.log(filterObj);
    let response = await Article.find(filterObj);
    res.status(200).json({ msg: "success", articles: response });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
module.exports = router;
