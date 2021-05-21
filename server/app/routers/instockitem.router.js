const instockItemController = require("../controllers/instockitem.controller");
const router = require("express").Router();

router.post("/api/instock", instockItemController.addInstockItem);
router.put("/api/instock/:uniqueId", instockItemController.editInstockItem);
router.delete(
  "/api/instock/:uniqueId",
  instockItemController.deleteInstockItem
);

module.exports = router;
