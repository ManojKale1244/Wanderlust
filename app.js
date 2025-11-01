if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("MAP_TOKEN:", process.env.MAP_TOKEN);


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const ExpressError = require("./utils/ExpressError.js");
const warpAsync = require("./utils/warpAsync.js");
const { listingSchema, reviewSchema } = require("./schema.js");

const Listing = require("./models/listing.js");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// ---------------------
// Middleware setup
// ---------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// ---------------------
// MongoDB connection
// ---------------------
const dbUrl = process.env.ATLAS_URL || "mongodb://127.0.0.1:27017/wanderlust";

mongoose.connect(dbUrl)
  .then(() => console.log("✅ Connected to MongoDB Atlas successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ---------------------
// Session configuration
// ---------------------
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, // time period in seconds
});

store.on("error", (error) => {
  console.log("❌ ERROR in MONGO SESSION STORE", error);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET || "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ---------------------
// Passport (Authentication)
// ---------------------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---------------------
// Flash message middleware
// ---------------------
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});



app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));

// app.get("/demouser", async (req,res)=>{
//   let fakeUser = new User({
//     email:"manojkale187@gmail.com",
//     username : "Manoj Kale",
//   })
//  let registerUser = await User.register(fakeUser,"helloworld");
//  res.send(registerUser);
// });



app.use("/listings", listingRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);
const validateListing = (req,res,next)=>{
     let {error} = listingSchema.validate(req.body);
   
   if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400,errMsg);
   } else{
    next();
   }
};

const validateReview = (req,res,next)=>{
     let {error} = reviewSchema.validate(req.body);
   
   if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400,errMsg);
   } else{
    next();
   }
};



//Index Route
app.get("/listings", warpAsync(async (req,res)=>{
 const allListings =  await Listing.find({});
    res.render("listings/index.ejs", {allListings});
    }));

    
    //new 
 app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
 });

    

    //Show Route
    app.get("/listings/:id", warpAsync (async (req,res)=>{
        let{id}= req.params;
        const listing = await Listing.findById(id).populate("reviews");
        res.render("listings/show.ejs",{listing});
    }));

//create Rout
app.post("/listings",validateListing, warpAsync ( async (req,res,next)=>{
   let result = listingSchema.validate(req.body);
   console.log(result);
   if(result.error){
     throw new ExpressError(400,result.error);
   }
        const newListing = new Listing(req.body.listing);
        
    await newListing.save();
    res.redirect("/listings");
    })
);

//Edite
app.get("/listings/:id/edit", warpAsync(async (req,res)=>{

     let{id}= req.params;
       const listing = await Listing.findById(id);
       res.render("listings/edit.ejs",{listing});
}));

app.put("/listings/:id",validateListing,  warpAsync(async (req,res)=>{
   
    let {id} = req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing})
   res.redirect(`/listings/${id}`);
}));

//DELETE
app.delete("/:id", warpAsync(async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);

  if (!deletedListing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
}));


const listingRoutes = require("./routes/listing.js");
const { error } = require("console");
app.use("/listings", listingRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Wanderlust!");
});







// app.get("/testListing", async (req,res)=>{
//  let sampleListing = new Listing({
//     title: "My New Villa",
//     description:"By the beach",
//     price : 1000,
//     location:"Pandharpur",
//     country:"india",
//  })
//  await sampleListing.save();
//  console.log("sample was save");
//  res.send("successfull tsting");
// })
// app.all('*', (req, res, next) => {
//   next(new ExpressError(404, 'Page Not Found'));
// });


app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  const message = err.message || "Something Went Wrong!"; 
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("Working");
})


