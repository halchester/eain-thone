const mongoose = require("mongoose");
const shortid = require("shortid");

const ToBuyItemModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    note: {
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

ToBuyItemModel.pre("save", async function (next) {
  this.uniqueId = await shortid.generate();
  next();
});

module.exports = mongoose.model("ToBuyItem", ToBuyItemModel);
