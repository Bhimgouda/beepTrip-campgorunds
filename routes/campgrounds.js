const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground } = require("../middleware");
const {
  editCampground,
  createCamground,
  showCampground,
  index,
  deleteCampground,
} = require("../controllers/campground");

// POST ROUTE || CREATE ROUTE
router.post("/", isLoggedIn, validateCampground, catchAsync(createCamground));

// INDEX || READ ROUTE
router.get("/", catchAsync(index));

// SHOW || READ ROUTE
router.get("/:id", catchAsync(showCampground));

// EDIT ROUTE || UPDATE ROUTE
router.put("/:id", isLoggedIn, validateCampground, catchAsync(editCampground));

// DELETE ROUTE
router.delete("/:id", isLoggedIn, catchAsync(deleteCampground));

module.exports = router;
