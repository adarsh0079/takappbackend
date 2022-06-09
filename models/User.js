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
      type: email,
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
      unique: true,
      minlength: 10,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    language: {
      type: String,
      enum: ["Hindi", "English"],
      required: true,
    },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    timeOfBirth: {
        hours:{
            type:Number,
            min:0,
            max:23,
        },
        minutes:{
            type:Number,
            min:0,
            max:59
        },
        seconds:{
            type:Number,
            min:0,
            max:59
        },
        required:true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports=model('User',UserSchema)
