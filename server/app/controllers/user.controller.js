const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, data: user, error: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username.trim().toLowerCase(),
      password: hashPassword,
    });

    newUser
      .save()
      .then((response) => {
        return res
          .status(200)
          .json({ success: true, data: response, error: null });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(400)
          .json({ success: false, data: {}, error: "Something went wrong!" });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      data: null,
      error: "Catching : Something went wrong!",
    });
  }
};

exports.signinUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Username or password is wrong!",
        data: {},
      });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid password", data: {} });
    }

    const token = jwt.sign({ _id: user.uniqueId }, process.env.TOKEN_THINGY);
    res.header("Auth", token);
    return res
      .status(200)
      .json({ success: true, error: null, data: { token, user } });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      data: null,
      error: "Catching : Something went wrong!",
    });
  }
};
