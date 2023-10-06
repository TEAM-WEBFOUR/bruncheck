const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    breakfast: {
      type: Number,
    },
    brunch: {
      type: Number,
    },
    lunch: {
      type: Number,
    },
    snack: {
      type: Number,
    },
    dinner: {
      type: Number,
    },
    dessert: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Question", questionSchema);

module.exports = User;
