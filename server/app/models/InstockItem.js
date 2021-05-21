const mongoose = require("mongoose");
const shortid = require("shortid");

const InstockItemModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quatity: {
      type: Number,
      required: true,
    },
    picURL: {
      type: String,
      required: true,
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
