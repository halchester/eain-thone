const InstockItem = require("../models/InstockItem");

exports.addInstockItem = async (req, res) => {
  const { name, quantity, picURL } = req.body;
  try {
    const newItem = new InstockItem({
      name,
      quantity,
      picURL,
    });

    newItem.save().then((response) => {
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

exports.deleteInstockItem = async (req, res) => {
  const { uniqueId } = req.params;

  try {
    const response = await InstockItem.findOneAndDelete({ uniqueId });
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

exports.editInstockItem = async (req, res) => {
  const { uniqueId } = req.params;

  try {
    const response = await InstockItem.updateOne(
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
