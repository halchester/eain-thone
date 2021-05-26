const instockItemController = require("../controllers/instockitem.controller");
const router = require("express").Router();
const verify = require("../auth/verifiedToken");

router.get(
  "/api/instock/:uniqueId",
  verify,
  instockItemController.getAllInstockItem
);
router.post("/api/instock", verify, instockItemController.addInstockItem);
router.put(
  "/api/instock/:uniqueId",
  verify,
  instockItemController.editInstockItem
);
router.delete(
  "/api/instock/:uniqueId",
  verify,
  instockItemController.deleteInstockItem
);

module.exports = router;
