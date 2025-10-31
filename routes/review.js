const express = require("express");
const router = express.Router({mergeParams:true});
const warpAsync = require("../utils/warpAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isreviewAuthor } = require("../middleware.js")
const reviewController = require("../controller/reviews.js")
// Post Review Route
router.post("/",isLoggedIn,validateReview, warpAsync (reviewController.postListing)
);

//Delete ReviewRout
router.delete("/:id/reviews/:reviewId",isLoggedIn,isreviewAuthor,warpAsync(reviewController.deleteListing));


module.exports = router;