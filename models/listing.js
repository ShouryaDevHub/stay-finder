const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1781458378182-0d946f4988cb?q=80&w=685&auto=format&fit=crop",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1781458378182-0d946f4988cb?q=80&w=685&auto=format&fit=crop"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    // here the models relationship cames =>
    {
      type: Schema.Types.ObjectId,
      ref: "Review", // Review Model as a refference.
    },
  ],
});

// Middleware =>
listingSchema.post("findOneAndDelete", async (listing) => {
  console.log("Middleware executed!");

  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
