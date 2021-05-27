const InstockItem = require("../models/InstockItem");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

exports.getAllInstockItem = async (req, res) => {
  const { uniqueId } = req.params;
  try {
    const response = await User.findOne({ uniqueId }).populate("instockItems");
    return res.status(200).json({ success: true, data: response, error: null });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, data: {}, error: "Something went wrong!" });
  }
};

exports.addInstockItem = async (req, res) => {
  const { name, quantity, picURL, userId } = req.body;
  try {
    const newItem = new InstockItem({
      name,
      quantity,
      picURL,
    });

    newItem.save().then(async (response) => {
      await User.updateOne(
        { uniqueId: userId },
        {
          $push: {
            instockItems: response,
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

const cloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
};

exports.uploadInstockItemImage = async (req, res) => {
  try {
    const filePath = req.file;

    const uploadImage = new Promise((resolve) => {
      cloudinary.config(cloudinaryConfig);
      cloudinary.uploader
        .upload(filePath.path, {
          folder: "spring_delivery",
          unique_filename: true,
        })
        .then((result) => {
          const imageUrl = result.secure_url;
          return resolve(imageUrl);
        })
        .catch((err) => err);
    });

    const image = await uploadImage;
    return res.status(200).json({ success: true, data: image });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({ success: true, data: {} });
  }
};
