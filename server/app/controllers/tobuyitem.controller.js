const ToBuyItem = require("../models/ToBuyItem");
const User = require("../models/User");

exports.getAllTobuyItems = async (req, res) => {
  const { uniqueId } = req.params;
  try {
    const response = await User.findOne({ uniqueId }).populate("tobuyItems");
    return res.status(200).json({ success: true, data: response, error: null });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, data: {}, error: "Something went wrong!" });
  }
};

exports.addTobuyitem = async (req, res) => {
  const { name, note, userId } = req.body;
  try {
    const newItem = new ToBuyItem({
      name,
      note,
    });

    newItem.save().then(async (response) => {
      await User.updateOne(
        {
          uniqueId: userId,
        },
        {
          $push: {
            tobuyItems: response,
          },
        }
      );
      return res
        .status(200)
        .json({ success: true, data: response, error: null });
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, data: {}, error: "Something went wrong!" });
  }
};

exports.deleteTobuyItem = async (req, res) => {
  const { uniqueId } = req.params;

  try {
    const response = await ToBuyItem.findOneAndDelete({ uniqueId });
    if (response) {
      return res
        .status(200)
        .json({ success: true, data: response, error: null });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, data: {}, error: "Something went wrong!" });
  }
};
