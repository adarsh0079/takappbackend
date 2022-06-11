const { Schema, model } = require("mongoose");
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
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
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
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
      minlength: 10,
      maxlength: 10,
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
      enum: ["single", "married", "others"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    timeOfBirth: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', UserSchema)
