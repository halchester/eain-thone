const instockItemController = require("../controllers/instockitem.controller");
const router = require("express").Router();
const verify = require("../auth/verifiedToken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/eain-thone");
  },
  filename: (req, file, cb) => {
    if (!file) {
      cb(null, false);
    } else {
      cb(null, file.originalname);
    }
  },
});

const uploadStore = multer({
  storage,
});

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
router.post(
  "/api/instock/upload",
  uploadStore.single("file"),
  instockItemController.uploadInstockItemImage
);
module.exports = router;
