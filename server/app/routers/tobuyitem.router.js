const tobuyItemController = require("../controllers/tobuyitem.controller");
const router = require("express").Router();
const verify = require("../auth/verifiedToken");

router.get(
  "/api/tobuys/:uniqueId",
  verify,
  tobuyItemController.getAllTobuyItems
);
router.post("/api/tobuy", verify, tobuyItemController.addTobuyitem);
router.delete(
  "/api/tobuy/:uniqueId",
  verify,
  tobuyItemController.deleteTobuyItem
);

module.exports = router;
