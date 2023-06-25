const { Schema, model } = require("mongoose");
const Collection = require("./Collection.model.js")

const recordSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true
    },
    artist: {
      type: String
    },

    category: {
        type: String,
        enum: ["Fills", "Double Stroke Rolls", "Paradiddles", "Patterns", "Songs", "Techniques", "Stick Tricks", "Other"]
    }
  },
  {
    timestamps: true,
  }
);

const Record = model("Record", recordSchema);

module.exports = Record;
