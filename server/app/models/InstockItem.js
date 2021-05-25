const mongoose = require("mongoose");
const shortid = require("shortid");

const InstockItemModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    picURL: {
      type: String,
    },
    uniqueId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

InstockItemModel.pre("save", async function (next) {
  this.uniqueId = await shortid.generate();
  next();
});

module.exports = mongoose.model("InstockItem", InstockItemModel);
