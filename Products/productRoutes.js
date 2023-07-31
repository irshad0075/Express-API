const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductsByBrand,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} = require("./productController");

router.post("/", createProduct);
router.get("/ProductByBrand", getProductsByBrand);
router.get("/ProductByCategory", getProductsByCategory);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
