const ToBuyItem = require("../models/ToBuyItem");

exports.addTobuyitem = async (req, res) => {
  const { name, note } = req.body;
  try {
    const newItem = new ToBuyItem({
      name,
      note,
    });

    const response = await newItem.save();
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

exports.editTobuyItem = async (req, res) => {
  const { uniqueId } = req.params;

  try {
    const response = await ToBuyItem.updateOne(
      {
        uniqueId,
      },
      {
        $set: { ...req.body },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ success: true, data: response, error: null });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, data: {}, error: "Something went wrong!" });
  }
};
