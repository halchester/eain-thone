const userController = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/api/register", userController.registerUser);
router.post("/api/signin", userController.signinUser);

module.exports = router;
