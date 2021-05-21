const tobuyItemController = require("../controllers/tobuyitem.controller");
const router = require("express").Router();

router.post("/api/tobuy", tobuyItemController.addTobuyitem);
router.put("/api/tobuy/:uniqueId", tobuyItemController.editTobuyItem);
router.delete("/api/tobuy/:uniqueId", tobuyItemController.deleteTobuyItem);

module.exports = router;
