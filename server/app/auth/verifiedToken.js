const jwt = require("jsonwebtoken");

// eslint-disable-next-line no-undef
module.exports = auth = (req, res, next) => {
  const token = req.header("Auth");
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_THINGY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Token is invalid" });
  }
};
