const mongoose = require("mongoose");
const shortid = require("shortid");

const UserModel = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    instockItems: {
      type: mongoose.Schema.Types.Array,
      default: [],
      ref: "InstockItem",
    },
    tobuyItems: {
      type: mongoose.Schema.Types.Array,
      default: [],
      ref: "ToBuyItem",
    },
    uniqueId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserModel.pre("save", async function (next) {
  this.uniqueId = await shortid.generate();
  next();
});

module.exports = mongoose.model("User", UserModel);
