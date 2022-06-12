const { Schema, model } = require("mongoose");
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
var validatePhone = (contact) => {
  return contact.match(/^[0-10]{10}$/);
};
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      required: "Email address is required",
    },
    password: {
      type: String,
      minlength: 8,
    },
    countryCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
      match: /^[0-9]{10}$/,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    language: {
      type: String,
      enum: ["hindi", "english"],
      required: true,
    },
    maritalStatus: {
      type: String,
      enum: ["unmarried", "married", "others"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    timeOfBirth: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
