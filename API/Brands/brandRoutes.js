const express = require("express");
const router = express.Router();

const {
  createBrand,
  getBrandByName,
  getBrandByID,
  updateBrand,
  deleteBrand,
} = require("./brandController.js");

router.post("/createBrand", createBrand);
router.get("/getbrandByName", getBrandByName);
router.get("/getbrandByID/:brandId", getBrandByID);
router.put("/updateBrand/:brandId", updateBrand);
router.delete("/deleteBrand/:brandId", deleteBrand);

module.exports = router;
