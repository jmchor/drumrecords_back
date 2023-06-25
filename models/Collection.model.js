const { Schema, model } = require("mongoose");
const Record = require("./Record.model");

const collectionSchema = new Schema(
  {

    name: {
        type: String,
        enum: ["Fills", "Double Stroke Rolls", "Paradiddles", "Patterns", "Songs", "Techniques", "Stick Tricks", "Other"]
    },

    records: [{
        type: Schema.Types.ObjectId,
        ref: "Record"
    }],

  },
  {
    timestamps: true,
  }
);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
