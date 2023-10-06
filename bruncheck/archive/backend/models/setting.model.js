const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const settingSchema = new Schema(
  {
    color: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    finishedStr: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.model("Setting", settingSchema);

module.exports = Setting;
