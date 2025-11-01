const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { cloudinary } = require("../cloudConfig");

const map_Token =process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: map_Token});

module.exports.index =  async (req,res)=>{
 const allListings =  await Listing.find({});
    res.render("listings/index.ejs", {allListings});
    };

    module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req,res)=>{
        let{id}= req.params;
        const listing = await Listing.findById(id)
        .populate({path : "reviews",
        populate:{
          path:"author",
        },
        })
        .populate("owner");
        if(!listing){
          req.flash("error","Listing you requested for does not exist!");
          res.redirect("/listings");
         
        }
         console.log(listing);
        res.render("listings/show.ejs",{listing});
    };


 module.exports.createListing = async (req, res, next) => {
  const response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  }).send();

  const geoData = response.body.features[0];
  if (!geoData) {
    req.flash("error", "Location not found!");
    return res.redirect("/listings/new");
  }

  const url = req.file.path;
  const filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = geoData.geometry;

  const savedListing = await newListing.save();
  console.log(savedListing);

  req.flash("success", "New listing created!");
  res.redirect("/listings");
};

      module.exports.renderEditForm = async (req,res)=>{
           let{id}= req.params;
             const listing = await Listing.findById(id);
              if(listing){
                req.flash("error","Listing you requested for does not exist!");
              }
              let originalImageUrl = listing.image.url;
           originalImageUrl = originalImageUrl.replace("/upload","/upload/w_300");
             res.render("listings/edit.ejs",{listing,originalImageUrl});
      };

   module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  // Find the listing to update
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

  // If listing not found
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  // Handle image upload only if a new file is provided
  if (req.file) {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${listing._id}`);
};


      module.exports.renderDelete = async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}
