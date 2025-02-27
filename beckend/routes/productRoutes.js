const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.index);

router.get("/tambah", productController.create);
router.post("/", productController.store);

router.get("/edit/:id", productController.edit); 
router.put("/:id", productController.update); 

router.get("/:id", productController.show);

router.delete("/:id", productController.destroy);

module.exports = router;
