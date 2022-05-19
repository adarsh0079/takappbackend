const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  formTitle: {
    type: String,
  },
  inputs: {
    type: [
      {
        inputType: String,
        placeholder: String,
        title: String,
      },
    ],
  },
});
module.exports = mongoose.model("Form", FormSchema);
