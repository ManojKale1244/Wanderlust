const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: [true, "Comment is required"]
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author:{
    type: Schema.Types.ObjectId,
    ref:"User",
  }
});

module.exports = mongoose.model("Review", reviewSchema);

