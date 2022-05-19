const express = require("express");
const Form = require("./Form");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGOURI);
const app = express();
app.use(cors());
app.use(express.json());
app.post("/form", async (req, res) => {
  try {
    console.log(req.body);
    let doc = await Form.create(req.body);
    console.log(doc);
    res.status(200).send("saved");
  } catch (err) {
    res.status(400).send("server error");
  }
});

app.get("/forms", async (req, res) => {
  try {
    let forms = await Form.find({});
    res.status(200).json({ forms, message: "Success" });
  } catch (err) {
    res.status(400).send("server error");
  }
});

app.get("/form/:id", async (req, res) => {
  try {
    let form = await Form.findById(req.params.id);
    if (form === null) {
      res.status(404).json({ message: "not found" });
    }
    res.status(200).json({ form, message: "Success" });
  } catch (err) {
    res.send("server error");
  }
});

app.put("/form/:id", async (req, res) => {
  try {
    let form = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ data: form, message: "updated" });
  } catch (err) {
    res.status(400).send("server error");
  }
});

app.listen(8080, () => {
  console.log("server listening on 8080");
});
