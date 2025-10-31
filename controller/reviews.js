const Listing = require("../models/listing");
const Review = require("../models/review")
module.exports.postListing = async (req,res)=>{
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)
    listing.reviews.push(newReview);
    newReview.author = req.user._id;
    await listing.save();
    await newReview.save();

    req.flash("success","New Review Created!");
   res.redirect(`/listings/${listing._id}`);
  
};

module.exports.deleteListing = async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};