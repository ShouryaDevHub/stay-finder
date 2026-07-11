const express = require("express");
const router = express.Router();
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// INDEX ROUTE =>
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }),
);

// NEW ROUTE
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// SHOW ROUTE =>
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params; // parsing the Id
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      req.flash("error", "Listing does not exist");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }),
);

// CREATE ROUTE =>
router.post(
  "/",
  isLoggedIn,
  validateListing, // passing validateListing as a MIDDLEWARE.
  wrapAsync(async (req, res, next) => {
    // so we can directly make a new Instance from here
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  }),
);
// EDIT ROUTE =>
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params; // parsing the Id
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing does not exist");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }),
);

// UPDATE ROUTE =>
router.put(
  "/:id",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(400, "Send valid data for listings");
    }
    let { id } = req.params; // parsing the Id
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`); // this will get redirect to the show route automatically .
  }),
);

// DELETE ROUTE =>
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let dltList = await Listing.findByIdAndDelete(id);
    console.log(dltList);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  }),
);

module.exports = router;
