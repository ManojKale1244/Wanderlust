const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/warpAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

// All Listings + Create New
router.route("/")
  .get(warpAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    warpAsync(listingController.createListing)
  );

// New Listing Form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show, Update, Delete
router.route("/:id")
  .get(warpAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    warpAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    warpAsync(listingController.deleteListing)
  );

// Edit Form
router.get("/:id/edit", isLoggedIn, isOwner, warpAsync(listingController.renderEditForm));

module.exports = router;
